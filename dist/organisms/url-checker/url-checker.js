"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _anchorScroll = require("../../assets/js/anchorScroll");
const _className = /*#__PURE__*/ _interop_require_default(require("../../assets/js/className"));
const _track = /*#__PURE__*/ _interop_require_default(require("../../assets/js/track"));
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const els = {
    urlInput: document.getElementById('urlInput'),
    urlInputFieldGroup: document.getElementById('urlInputFieldGroup'),
    urlInputHelp: document.getElementById('urlInputHelp'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    clearBtn: document.getElementById('clearBtn'),
    inputHint: document.getElementById('inputHint'),
    results: document.getElementById('results'),
    emptyState: document.getElementById('emptyState'),
    signals: document.getElementById('signals'),
    focusHost: document.getElementById('focusHost'),
    focusHostBox: document.getElementById('focusHostBox'),
    focusRegistrable: document.getElementById('focusRegistrable'),
    scriptWarningWrap: document.getElementById('scriptWarningWrap'),
    scriptWarningList: document.getElementById('scriptWarningList'),
    protocolBox: document.getElementById('protocolBox'),
    outProtocol: document.getElementById('outProtocol'),
    credentialsBox: document.getElementById('credentialsBox'),
    outUsername: document.getElementById('outUsername'),
    outPassword: document.getElementById('outPassword'),
    subdomainBox: document.getElementById('subdomainBox'),
    outSubdomain: document.getElementById('outSubdomain'),
    ipAddressBox: document.getElementById('ipAddressBox'),
    outIpAddress: document.getElementById('outIpAddress'),
    outIpVersion: document.getElementById('outIpVersion'),
    domainBox: document.getElementById('domainBox'),
    outDomain: document.getElementById('outDomain'),
    tldBox: document.getElementById('tldBox'),
    outTld: document.getElementById('outTld'),
    pathBox: document.getElementById('pathBox'),
    outPath: document.getElementById('outPath'),
    outFolders: document.getElementById('outFolders'),
    queryBox: document.getElementById('queryBox'),
    outQuery: document.getElementById('outQuery'),
    outParamsWrap: document.getElementById('outParamsWrap'),
    outParams: document.getElementById('outParams'),
    hashBox: document.getElementById('hashBox'),
    outHash: document.getElementById('outHash'),
    breakdownDetails: document.getElementById('breakdownDetails'),
    detailsSection: document.getElementById('detailsSection'),
    // NEW: breakdown
    breakdownWrap: document.getElementById('breakdownWrap'),
    breakdownUrlBox: document.getElementById('breakdownUrlBox'),
    breakdownUrl: document.getElementById('breakdownUrl'),
    breakdownLegend: document.getElementById('breakdownLegend'),
    breakdownSvg: document.getElementById('breakdownSvg')
};
const shouldInitUrlChecker = Boolean(document.querySelector(`.${(0, _className.default)('o-url-checker')}`) && els.urlInput && els.analyzeBtn && els.clearBtn);
const COMMON_2LEVEL_SUFFIXES = new Set([
    'co.uk',
    'org.uk',
    'ac.uk',
    'gov.uk',
    'com.au',
    'net.au',
    'org.au',
    'co.nz',
    'org.nz',
    'co.jp',
    'ne.jp',
    'or.jp',
    'com.br',
    'com.mx',
    'com.tr',
    'com.ar',
    'com.sg',
    'com.my',
    'com.hk'
]);
const BREAKDOWN_PARTS = [
    {
        key: 'protocol',
        label: 'Protokoll',
        desc: 'http/https'
    },
    {
        key: 'credentials',
        label: 'Inloggning',
        desc: 'user:pass@'
    },
    {
        key: 'subdomain',
        label: 'Subdomän',
        desc: 't.ex. www / login'
    },
    {
        key: 'ipAddress',
        label: 'IP-adress',
        desc: 'IPv4 / IPv6'
    },
    {
        key: 'domain',
        label: 'Domän',
        desc: 'huvudadressen'
    },
    {
        key: 'tld',
        label: 'Toppdomän',
        desc: 't.ex. .se'
    },
    {
        key: 'path',
        label: 'Sökväg',
        desc: '/mapp/sida'
    },
    {
        key: 'query',
        label: 'Parametrar',
        desc: '?a=b'
    },
    {
        key: 'hash',
        label: 'Ankare',
        desc: '#sektion'
    }
];
const BREAKDOWN_PART_LABELS = Object.fromEntries(BREAKDOWN_PARTS.map((part)=>[
        part.key,
        part.label
    ]));
const BREAKDOWN_ARIA_ID_PREFIX = `url-checker-breakdown-item-${Math.random().toString(36).slice(2, 10)}`;
const PART_BOX_MAP = {
    protocol: 'protocolBox',
    credentials: 'credentialsBox',
    subdomain: 'subdomainBox',
    ipAddress: 'ipAddressBox',
    domain: 'domainBox',
    tld: 'tldBox',
    path: 'pathBox',
    query: 'queryBox',
    hash: 'hashBox'
};
const SUSPICIOUS_SCRIPT_PATTERNS = [
    {
        label: 'Kyrilliska tecken',
        tone: 'warn',
        ranges: [
            [
                0x0400,
                0x04ff
            ],
            [
                0x0500,
                0x052f
            ],
            [
                0x1c80,
                0x1c8f
            ],
            [
                0x2de0,
                0x2dff
            ],
            [
                0xa640,
                0xa69f
            ]
        ]
    },
    {
        label: 'Armeniska tecken',
        tone: 'warn',
        ranges: [
            [
                0x0530,
                0x058f
            ]
        ]
    },
    {
        label: 'Grekiska tecken',
        tone: 'warn',
        ranges: [
            [
                0x0370,
                0x03ff
            ],
            [
                0x1f00,
                0x1fff
            ]
        ]
    },
    {
        label: 'Hebreiska tecken',
        tone: 'warn',
        ranges: [
            [
                0x0590,
                0x05ff
            ]
        ]
    },
    {
        label: 'Thailändska tecken',
        tone: 'warn',
        ranges: [
            [
                0x0e00,
                0x0e7f
            ]
        ]
    }
];
const INVISIBLE_CHARACTER_PATTERNS = [
    {
        label: 'Osynliga tecken',
        tone: 'danger',
        ranges: [
            [
                0x00ad,
                0x00ad
            ],
            [
                0x200b,
                0x200d
            ],
            [
                0x2060,
                0x2060
            ],
            [
                0xfeff,
                0xfeff
            ]
        ],
        displayAsCodePoint: true,
        summary: 'Osynliga tecken hittades:'
    }
];
const BIDI_CONTROL_PATTERNS = [
    {
        label: 'Bidi-styrtecken',
        tone: 'danger',
        ranges: [
            [
                0x061c,
                0x061c
            ],
            [
                0x200e,
                0x200f
            ],
            [
                0x202a,
                0x202e
            ],
            [
                0x2066,
                0x2069
            ]
        ],
        displayAsCodePoint: true,
        summary: 'Bidi-styrtecken hittades:'
    }
];
const FULLWIDTH_CHARACTER_PATTERNS = [
    {
        label: 'Fullbreddstecken',
        tone: 'warn',
        ranges: [
            [
                0x3000,
                0x3000
            ],
            [
                0x3002,
                0x3002
            ],
            [
                0xff01,
                0xff0f
            ],
            [
                0xff10,
                0xff19
            ],
            [
                0xff1a,
                0xff20
            ],
            [
                0xff21,
                0xff3a
            ],
            [
                0xff3b,
                0xff40
            ],
            [
                0xff41,
                0xff5a
            ],
            [
                0xff5b,
                0xff60
            ],
            [
                0xffe0,
                0xffe6
            ]
        ],
        summary: 'Fullbreddstecken hittades:'
    }
];
const LATIN_LOOKALIKE_CHAR_MAP = {
    'Α': 'A',
    'Β': 'B',
    'Ε': 'E',
    'Ζ': 'Z',
    'Η': 'H',
    'Ι': 'I',
    'Κ': 'K',
    'Μ': 'M',
    'Ν': 'N',
    'Ο': 'O',
    'Ρ': 'P',
    'Τ': 'T',
    'Υ': 'Y',
    'Χ': 'X',
    'Ϊ': 'Ï',
    'Ϋ': 'Ü',
    'α': 'a',
    'ε': 'e',
    'ι': 'i',
    'κ': 'k',
    'ο': 'o',
    'ρ': 'p',
    'τ': 't',
    'χ': 'x',
    'ϊ': 'ï',
    'ϋ': 'ü',
    'А': 'A',
    'В': 'B',
    'Е': 'E',
    'Ё': 'Ë',
    'К': 'K',
    'М': 'M',
    'Н': 'H',
    'О': 'O',
    'Р': 'P',
    'С': 'C',
    'Т': 'T',
    'У': 'Y',
    'Х': 'X',
    'Ӓ': 'Ä',
    'Ӧ': 'Ö',
    'Ӱ': 'Ü',
    'Ї': 'Ï',
    'а': 'a',
    'с': 'c',
    'е': 'e',
    'ё': 'ë',
    'і': 'i',
    'ј': 'j',
    'о': 'o',
    'р': 'p',
    'ѕ': 's',
    'у': 'y',
    'х': 'x',
    'ӓ': 'ä',
    'ӧ': 'ö',
    'ӱ': 'ü',
    'ї': 'ï',
    'ӏ': 'l',
    'ԁ': 'd'
};
const CONTROL_CHARACTER_LABELS = {
    0x0000: 'NUL',
    0x0001: 'SOH',
    0x0002: 'STX',
    0x0003: 'ETX',
    0x0004: 'EOT',
    0x0005: 'ENQ',
    0x0006: 'ACK',
    0x0007: 'BEL',
    0x0008: 'BACKSPACE',
    0x0009: 'TAB',
    0x000a: 'LINE FEED',
    0x000b: 'VERTICAL TAB',
    0x000c: 'FORM FEED',
    0x000d: 'CARRIAGE RETURN',
    0x000e: 'SHIFT OUT',
    0x000f: 'SHIFT IN',
    0x0010: 'DATA LINK ESCAPE',
    0x0011: 'DEVICE CONTROL 1',
    0x0012: 'DEVICE CONTROL 2',
    0x0013: 'DEVICE CONTROL 3',
    0x0014: 'DEVICE CONTROL 4',
    0x0015: 'NEGATIVE ACKNOWLEDGE',
    0x0016: 'SYNCHRONOUS IDLE',
    0x0017: 'END OF TRANSMISSION BLOCK',
    0x0018: 'CANCEL',
    0x0019: 'END OF MEDIUM',
    0x001a: 'SUBSTITUTE',
    0x001b: 'ESCAPE',
    0x001c: 'FILE SEPARATOR',
    0x001d: 'GROUP SEPARATOR',
    0x001e: 'RECORD SEPARATOR',
    0x001f: 'UNIT SEPARATOR',
    0x007f: 'DELETE'
};
const PUNYCODE = {
    base: 36,
    tMin: 1,
    tMax: 26,
    skew: 38,
    damp: 700,
    initialBias: 72,
    initialN: 128,
    delimiter: '-'
};
const SPECIAL_CODE_POINT_LABELS = {
    0x00ad: 'SOFT HYPHEN',
    0x200b: 'ZERO WIDTH SPACE',
    0x200c: 'ZERO WIDTH NON-JOINER',
    0x200d: 'ZERO WIDTH JOINER',
    0x200e: 'LEFT-TO-RIGHT MARK',
    0x200f: 'RIGHT-TO-LEFT MARK',
    0x202a: 'LEFT-TO-RIGHT EMBEDDING',
    0x202b: 'RIGHT-TO-LEFT EMBEDDING',
    0x202c: 'POP DIRECTIONAL FORMATTING',
    0x202d: 'LEFT-TO-RIGHT OVERRIDE',
    0x202e: 'RIGHT-TO-LEFT OVERRIDE',
    0x2060: 'WORD JOINER',
    0x2066: 'LEFT-TO-RIGHT ISOLATE',
    0x2067: 'RIGHT-TO-LEFT ISOLATE',
    0x2068: 'FIRST STRONG ISOLATE',
    0x2069: 'POP DIRECTIONAL ISOLATE',
    0xfeff: 'ZERO WIDTH NO-BREAK SPACE'
};
const LATIN_SCRIPT_RANGES = [
    [
        0x0041,
        0x005a
    ],
    [
        0x0061,
        0x007a
    ],
    [
        0x00c0,
        0x00ff
    ],
    [
        0x0100,
        0x017f
    ],
    [
        0x0180,
        0x024f
    ],
    [
        0x1e00,
        0x1eff
    ],
    [
        0x2c60,
        0x2c7f
    ],
    [
        0xa720,
        0xa7ff
    ],
    [
        0xab30,
        0xab6f
    ]
];
const HOST_SUSPICIOUS_CHARACTER_PATTERNS = [
    ...INVISIBLE_CHARACTER_PATTERNS,
    ...BIDI_CONTROL_PATTERNS,
    ...FULLWIDTH_CHARACTER_PATTERNS,
    ...SUSPICIOUS_SCRIPT_PATTERNS
];
const HOST_ALWAYS_VISIBLE_CHARACTER_PATTERNS = [
    ...INVISIBLE_CHARACTER_PATTERNS,
    ...BIDI_CONTROL_PATTERNS
];
const CLASS = {
    pill: (0, _className.default)('o-url-checker__pill'),
    pillGood: (0, _className.default)('o-url-checker__pill--good'),
    pillWarn: (0, _className.default)('o-url-checker__pill--warn'),
    pillDanger: (0, _className.default)('o-url-checker__pill--danger'),
    muted: (0, _className.default)('o-url-checker__muted'),
    breakdownSegment: (0, _className.default)('o-url-checker__breakdown__segment'),
    breakdownItem: (0, _className.default)('o-url-checker__breakdown__item'),
    breakdownLine: (0, _className.default)('o-url-checker__breakdown__line'),
    breakdownDot: (0, _className.default)('o-url-checker__breakdown__dot'),
    hostSegment: (0, _className.default)('o-url-checker__domain-focus__host-segment'),
    hostSegmentSpecial: (0, _className.default)('o-url-checker__domain-focus__host-segment--special')
};
const BREAKDOWN_SEGMENT_SELECTOR = `.${CLASS.breakdownSegment}`;
const BREAKDOWN_ITEM_SELECTOR = `.${CLASS.breakdownItem}`;
const breakdownSegmentPartSelector = (partKey)=>`${BREAKDOWN_SEGMENT_SELECTOR}[data-part="${partKey}"]`;
const breakdownItemPartSelector = (partKey)=>`${BREAKDOWN_ITEM_SELECTOR}[data-part="${partKey}"]`;
let visiblePartState = {
    availability: {}
};
let detailsMountedInLegend = false;
function safeText(el, value) {
    el.textContent = value && String(value).length ? String(value) : '—';
}
function setSafeMarkup(el, markup) {
    el.innerHTML = markup;
}
function isCodePointInRanges(codePoint, ranges) {
    return ranges.some(([start, end])=>codePoint >= start && codePoint <= end);
}
function formatCodePoint(codePoint) {
    return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
}
function getPatternByCodePoint(codePoint, patterns) {
    for (const pattern of patterns){
        if (isCodePointInRanges(codePoint, pattern.ranges)) return pattern;
    }
    return null;
}
function formatPatternDetail(char, codePoint, pattern) {
    if (pattern == null ? void 0 : pattern.displayAsCodePoint) return formatCodePoint(codePoint);
    return char;
}
function getPunycodeDigit(char) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) return PUNYCODE.base;
    if (codePoint >= 0x30 && codePoint <= 0x39) return codePoint - 22;
    if (codePoint >= 0x41 && codePoint <= 0x5a) return codePoint - 65;
    if (codePoint >= 0x61 && codePoint <= 0x7a) return codePoint - 97;
    return PUNYCODE.base;
}
function adaptPunycodeBias(delta, numPoints, firstTime) {
    let nextDelta = firstTime ? Math.floor(delta / PUNYCODE.damp) : Math.floor(delta / 2);
    nextDelta += Math.floor(nextDelta / numPoints);
    let k = 0;
    const baseMinusTMin = PUNYCODE.base - PUNYCODE.tMin;
    const threshold = Math.floor(baseMinusTMin * PUNYCODE.tMax / 2);
    while(nextDelta > threshold){
        nextDelta = Math.floor(nextDelta / baseMinusTMin);
        k += PUNYCODE.base;
    }
    return k + Math.floor((baseMinusTMin + 1) * nextDelta / (nextDelta + PUNYCODE.skew));
}
function decodePunycodeLabel(label) {
    const input = String(label || '');
    if (!/^xn--/i.test(input)) return input;
    const encoded = input.slice(4);
    const output = [];
    let index = 0;
    let i = 0;
    let n = PUNYCODE.initialN;
    let bias = PUNYCODE.initialBias;
    const basicIndex = encoded.lastIndexOf(PUNYCODE.delimiter);
    if (basicIndex >= 0) {
        output.push(...encoded.slice(0, basicIndex));
        index = basicIndex + 1;
    }
    while(index < encoded.length){
        const oldI = i;
        let w = 1;
        for(let k = PUNYCODE.base;; k += PUNYCODE.base){
            if (index >= encoded.length) return input;
            const digit = getPunycodeDigit(encoded[index]);
            index += 1;
            if (digit >= PUNYCODE.base) return input;
            i += digit * w;
            const t = k <= bias ? PUNYCODE.tMin : k >= bias + PUNYCODE.tMax ? PUNYCODE.tMax : k - bias;
            if (digit < t) break;
            w *= PUNYCODE.base - t;
        }
        const outputLength = output.length + 1;
        bias = adaptPunycodeBias(i - oldI, outputLength, oldI === 0);
        n += Math.floor(i / outputLength);
        i %= outputLength;
        output.splice(i, 0, String.fromCodePoint(n));
        i += 1;
    }
    return output.join('');
}
function toUnicodeHost(hostname) {
    const host = String(hostname || '').trim();
    if (!host || looksLikeIPAddress(host)) return formatIPAddress(host);
    return host.split(/[.。｡．]/u).filter(Boolean).map((label)=>decodePunycodeLabel(label).toLowerCase()).join('.');
}
function getCodePointLabel(codePoint, fallbackLabel = '') {
    return SPECIAL_CODE_POINT_LABELS[codePoint] || CONTROL_CHARACTER_LABELS[codePoint] || fallbackLabel;
}
function getLatinLookalikeCharacter(char) {
    return LATIN_LOOKALIKE_CHAR_MAP[char] || '';
}
function getScriptLabelByCodePoint(codePoint) {
    const pattern = getPatternByCodePoint(codePoint, SUSPICIOUS_SCRIPT_PATTERNS);
    return pattern ? pattern.label : '';
}
function extractInputHost(rawInput) {
    const input = String(rawInput || '').trim();
    if (!input) return '';
    const normalized = normalizeURLInput(input);
    const withoutScheme = normalized.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '');
    const authority = withoutScheme.split(/[/?#]/, 1)[0] || '';
    const withoutAuth = authority.includes('@') ? authority.split('@').pop() || '' : authority;
    if (!withoutAuth) return '';
    if (withoutAuth.startsWith('[')) {
        const endBracket = withoutAuth.indexOf(']');
        if (endBracket > 0) return withoutAuth.slice(0, endBracket + 1);
    }
    return withoutAuth.split(':')[0];
}
function stripIPv6Brackets(hostname) {
    const host = String(hostname || '').trim();
    if (host.startsWith('[') && host.endsWith(']')) return host.slice(1, -1);
    return host;
}
function isIPv4Address(hostname) {
    const parts = String(hostname || '').trim().split('.');
    return parts.length === 4 && parts.every((part)=>/^\d{1,3}$/.test(part) && Number(part) <= 255);
}
function getIPAddressType(hostname) {
    const normalizedHost = stripIPv6Brackets(hostname).trim();
    if (!normalizedHost) return '';
    if (isIPv4Address(normalizedHost)) return 'ipv4';
    if (normalizedHost.includes(':')) return 'ipv6';
    return '';
}
function formatIPAddress(hostname) {
    const host = String(hostname || '').trim();
    const ipAddressType = getIPAddressType(host);
    if (!ipAddressType) return host;
    const normalizedHost = stripIPv6Brackets(host);
    return ipAddressType === 'ipv6' ? `[${normalizedHost}]` : normalizedHost;
}
function normalizeURLInput(rawInput) {
    const input = String(rawInput || '').trim();
    if (!input) return '';
    const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(input);
    if (!hasScheme) {
        const authority = input.split(/[/?#]/, 1)[0] || '';
        const rest = input.slice(authority.length);
        const colonCount = (authority.match(/:/g) || []).length;
        if (authority.startsWith('[')) return `https://${authority}${rest}`;
        if (colonCount >= 2) return `https://[${stripIPv6Brackets(authority)}]${rest}`;
        return `https://${authority}${rest}`;
    }
    return input.replace(/^([a-z][a-z0-9+.-]*:\/\/)([^/?#]*)/i, (match, scheme, authority)=>{
        if (!authority || authority.startsWith('[')) return match;
        let authPrefix = '';
        let hostPort = authority;
        if (authority.includes('@')) {
            const atIndex = authority.lastIndexOf('@');
            authPrefix = authority.slice(0, atIndex + 1);
            hostPort = authority.slice(atIndex + 1);
        }
        if (hostPort.startsWith('[')) return match;
        const colonCount = (hostPort.match(/:/g) || []).length;
        if (colonCount < 2) return match;
        return `${scheme}${authPrefix}[${stripIPv6Brackets(hostPort)}]`;
    });
}
function buildHostVisualMarkup(hostname) {
    const host = String(hostname || '').trim();
    if (!host) return '—';
    const chunks = [];
    let buffer = '';
    const flushBuffer = ()=>{
        if (!buffer) return;
        chunks.push(escapeHTML(buffer));
        buffer = '';
    };
    for (const char of host){
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) {
            buffer += char;
            continue;
        }
        const alwaysVisiblePattern = getPatternByCodePoint(codePoint, HOST_ALWAYS_VISIBLE_CHARACTER_PATTERNS);
        const fullwidthPattern = getPatternByCodePoint(codePoint, FULLWIDTH_CHARACTER_PATTERNS);
        const latinLookalike = getLatinLookalikeCharacter(char);
        const shouldHighlightAsLookalike = Boolean(fullwidthPattern || latinLookalike);
        if (!alwaysVisiblePattern && !shouldHighlightAsLookalike) {
            buffer += char;
            continue;
        }
        flushBuffer();
        const pattern = alwaysVisiblePattern || fullwidthPattern;
        const title = escapeHTML(latinLookalike ? `Kan förväxlas med latinskt tecken: ${latinLookalike}` : (pattern == null ? void 0 : pattern.label) || '');
        const visibleChar = escapeHTML(pattern ? formatPatternDetail(char, codePoint, pattern) : char);
        const specialClass = shouldHighlightAsLookalike ? ` ${CLASS.hostSegmentSpecial}` : '';
        chunks.push(`<span class="${CLASS.breakdownSegment} ${CLASS.hostSegment}${specialClass}" title="${title}">${visibleChar}</span>`);
    }
    flushBuffer();
    return chunks.join('') || '—';
}
function hasVisibleHostMarkup(hostname) {
    const host = String(hostname || '').trim();
    if (!host) return false;
    return Array.from(host).some((char)=>{
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) return false;
        return Boolean(getPatternByCodePoint(codePoint, HOST_ALWAYS_VISIBLE_CHARACTER_PATTERNS) || getPatternByCodePoint(codePoint, FULLWIDTH_CHARACTER_PATTERNS) || getLatinLookalikeCharacter(char));
    });
}
function collectPatternFindings(text, patterns) {
    const findingsByLabel = new Map(patterns.map((pattern)=>[
            pattern.label,
            _extends({}, pattern, {
                count: 0,
                details: new Set()
            })
        ]));
    for (const char of String(text || '')){
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) continue;
        const pattern = getPatternByCodePoint(codePoint, patterns);
        if (!pattern) continue;
        const finding = findingsByLabel.get(pattern.label);
        if (!finding) continue;
        finding.count += 1;
        finding.details.add(formatPatternDetail(char, codePoint, pattern));
    }
    return Array.from(findingsByLabel.values()).filter((finding)=>finding.count > 0).map((finding)=>({
            label: finding.label,
            summary: finding.summary || `${finding.count} tecken hittades:`,
            details: Array.from(finding.details).join(' '),
            tone: finding.tone || 'danger'
        }));
}
function detectSuspiciousScripts(text) {
    return collectPatternFindings(text, SUSPICIOUS_SCRIPT_PATTERNS);
}
function detectInvisibleCharacters(text) {
    return collectPatternFindings(text, INVISIBLE_CHARACTER_PATTERNS);
}
function detectBidiControlCharacters(text) {
    return collectPatternFindings(text, BIDI_CONTROL_PATTERNS);
}
function detectFullwidthCharacters(text) {
    return collectPatternFindings(text, FULLWIDTH_CHARACTER_PATTERNS);
}
function getHostScriptLabelByCodePoint(codePoint) {
    if (isCodePointInRanges(codePoint, LATIN_SCRIPT_RANGES)) return 'Latinska tecken';
    return getScriptLabelByCodePoint(codePoint);
}
function detectMixedScriptHostname(hostname) {
    const host = String(hostname || '').trim();
    if (!host) return null;
    const labels = host.split(/[.。｡．]/u).filter(Boolean);
    const mixedLabels = [];
    for (const label of labels){
        const labelScripts = new Set();
        for (const char of label){
            if (/[\d-]/.test(char)) continue;
            const codePoint = char.codePointAt(0);
            if (codePoint === undefined) continue;
            const scriptLabel = getHostScriptLabelByCodePoint(codePoint);
            if (!scriptLabel) continue;
            labelScripts.add(scriptLabel);
        }
        if (labelScripts.size > 1) {
            mixedLabels.push(`${label}: ${Array.from(labelScripts).join(' + ')}`);
        }
    }
    if (!mixedLabels.length) return null;
    return {
        label: 'Blandade teckenuppsättningar i domänen',
        summary: 'Ett eller flera domänled blandar flera teckenuppsättningar, vilket kan göra tecken lättare att förväxla:',
        details: mixedLabels.join(' | '),
        detailsClassName: CLASS.muted,
        tone: 'danger'
    };
}
function getSeverityAriaExplanation(tone) {
    if (tone === 'good') return 'Bra. Inget uppenbart problem syns här.';
    if (tone === 'neutral') return 'Information. Detta är vanligt i länkar, men innehållet kan ibland vara värt att kontrollera.';
    if (tone === 'warn') return 'Information. Här kan det vara bra att vara uppmärksam.';
    if (tone === 'danger') return 'Varning. Det här kan vara vilseledande eller riskfyllt.';
    return '';
}
function renderScriptWarnings(findings) {
    if (!els.scriptWarningWrap || !els.scriptWarningList) return;
    els.scriptWarningList.innerHTML = '';
    if (!findings.length) {
        els.scriptWarningWrap.hidden = true;
        return;
    }
    for (const finding of findings){
        const item = document.createElement('div');
        const textWrap = document.createElement('span');
        const title = document.createElement('strong');
        const desc = document.createElement('span');
        const details = document.createElement('span');
        item.className = `${CLASS.breakdownItem} ${(0, _className.default)('o-url-checker__script-item')}`;
        item.classList.add((0, _className.default)(finding.tone === 'danger' ? 'o-url-checker__script-item--danger' : 'o-url-checker__script-item--warn'));
        item.setAttribute('role', 'note');
        item.setAttribute('aria-label', `${finding.label}. ${getSeverityAriaExplanation(finding.tone)}`);
        textWrap.className = (0, _className.default)('o-url-checker__script-text');
        title.textContent = finding.label;
        desc.className = CLASS.muted;
        desc.textContent = finding.summary || '';
        details.className = finding.detailsClassName || (0, _className.default)('o-url-checker__inlinecode');
        details.textContent = finding.details || '';
        textWrap.appendChild(title);
        if (desc.textContent) {
            textWrap.appendChild(document.createElement('br'));
            textWrap.appendChild(desc);
        }
        if (details.textContent) {
            textWrap.appendChild(document.createElement('br'));
            textWrap.appendChild(details);
        }
        item.appendChild(textWrap);
        els.scriptWarningList.appendChild(item);
    }
    els.scriptWarningWrap.hidden = false;
}
function looksLikeIPAddress(hostname) {
    return Boolean(getIPAddressType(hostname));
}
function computeDomainParts(hostname) {
    const host = stripIPv6Brackets(hostname).trim().toLowerCase();
    if (!host) return {
        subdomain: '',
        domain: '',
        tld: '',
        registrable: ''
    };
    if (looksLikeIPAddress(host)) {
        return {
            subdomain: '',
            domain: '',
            tld: '',
            registrable: ''
        };
    }
    const labels = host.split('.').filter(Boolean);
    if (labels.length === 1) {
        return {
            subdomain: '',
            domain: labels[0],
            tld: '',
            registrable: labels[0]
        };
    }
    const last2 = labels.slice(-2).join('.');
    let suffixLabelsCount = 1;
    if (COMMON_2LEVEL_SUFFIXES.has(last2)) suffixLabelsCount = 2;
    const tld = labels.slice(-suffixLabelsCount).join('.');
    const domainLabelIndex = labels.length - suffixLabelsCount - 1;
    const domain = domainLabelIndex >= 0 ? labels[domainLabelIndex] : '';
    const subdomain = domainLabelIndex > 0 ? labels.slice(0, domainLabelIndex).join('.') : '';
    const registrable = domain && tld ? `${domain}.${tld}` : host;
    return {
        subdomain,
        domain,
        tld,
        registrable
    };
}
function parseMaybeURL(raw) {
    const input = (raw || '').trim();
    if (!input) return {
        ok: false,
        reason: 'empty'
    };
    if (/\s/.test(input)) return {
        ok: false,
        reason: 'invalid'
    };
    const schemeMatch = input.match(/^([a-z][a-z0-9+.-]*):\/\//i);
    const explicitScheme = schemeMatch ? schemeMatch[1].toLowerCase() : '';
    const hasScheme = Boolean(explicitScheme);
    const allowedSchemes = new Set([
        'http',
        'https',
        'ftp'
    ]);
    if (explicitScheme && !allowedSchemes.has(explicitScheme)) {
        return {
            ok: false,
            reason: 'invalid_protocol',
            protocol: explicitScheme
        };
    }
    const normalized = normalizeURLInput(input);
    try {
        const url = new URL(normalized);
        return {
            ok: true,
            url,
            schemeMissing: !hasScheme,
            raw: input
        };
    } catch (unused) {
        return {
            ok: false,
            reason: 'invalid'
        };
    }
}
function addSignal(text, kind = 'neutral') {
    const pill = document.createElement('span');
    const pillText = document.createElement('span');
    pill.className = `${(0, _className.default)('a-tag')} ${CLASS.pill} u-pointer-events-none u-font-size-medium`;
    pillText.className = (0, _className.default)('a-tag__text');
    if (kind === 'good') pill.classList.add(CLASS.pillGood);
    if (kind === 'warn') pill.classList.add(CLASS.pillWarn);
    if (kind === 'danger') pill.classList.add(CLASS.pillDanger);
    pill.setAttribute('aria-label', `${text}. ${getSeverityAriaExplanation(kind)}`);
    pillText.textContent = text;
    pill.appendChild(pillText);
    els.signals.appendChild(pill);
}
function setDescribedByToken(el, token, shouldHaveToken) {
    if (!el || !token) return;
    const tokens = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    const nextTokens = shouldHaveToken ? Array.from(new Set([
        ...tokens,
        token
    ])) : tokens.filter((existing)=>existing !== token);
    if (nextTokens.length) el.setAttribute('aria-describedby', nextTokens.join(' '));
    else el.removeAttribute('aria-describedby');
}
function setInputErrorAccessibility(hasError) {
    if (!els.urlInput) return;
    if (hasError) els.urlInput.setAttribute('aria-invalid', 'true');
    else els.urlInput.removeAttribute('aria-invalid');
    if (els.urlInputFieldGroup) {
        els.urlInputFieldGroup.classList.toggle('is-invalid', hasError);
    }
    setDescribedByToken(els.urlInput, 'results', true);
    setDescribedByToken(els.urlInput, 'urlInputHelp', hasError);
}
function setHostSpecialBoxesVisibility(showHostBox) {
    if (els.focusHostBox) els.focusHostBox.hidden = !showHostBox;
}
function setVisibleState({ hasResults, errorMessage = '' }) {
    const message = (errorMessage || '').trim();
    const hasError = Boolean(message);
    if (els.urlInputHelp) els.urlInputHelp.textContent = message;
    if (els.inputHint) {
        if (hasError) {
            els.inputHint.setAttribute('aria-label', `Varning. Kontrollera länken en gång till. ${message}`);
        } else {
            els.inputHint.removeAttribute('aria-label');
        }
    }
    setInputErrorAccessibility(hasError);
    els.results.hidden = !hasResults;
    els.emptyState.style.display = hasResults ? 'none' : '';
}
function trackUrlAnalysis() {
    (0, _track.default)({
        event: 'check_url'
    });
}
function parseRawQueryEntries(search) {
    const rawQuery = String(search || '').replace(/^\?/, '');
    if (!rawQuery) return [];
    return rawQuery.split('&').map((entry)=>{
        const separatorIndex = entry.indexOf('=');
        if (separatorIndex === -1) {
            return {
                rawKey: entry,
                rawValue: ''
            };
        }
        return {
            rawKey: entry.slice(0, separatorIndex),
            rawValue: entry.slice(separatorIndex + 1)
        };
    });
}
function formatVisibleQueryText(text) {
    const value = String(text != null ? text : '');
    if (!value.length) return '[tomt]';
    const shouldRevealWhitespace = value.trim() !== value || !value.trim().length;
    let hasVisibleSubstitution = false;
    const formatted = Array.from(value, (char)=>{
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) return char;
        if (char === ' ' && shouldRevealWhitespace) {
            hasVisibleSubstitution = true;
            return '[mellanslag]';
        }
        if (char === '\t') {
            hasVisibleSubstitution = true;
            return '[tabb]';
        }
        if (char === '\n') {
            hasVisibleSubstitution = true;
            return '[radbrytning]';
        }
        if (char === '\r') {
            hasVisibleSubstitution = true;
            return '[vagnretur]';
        }
        const invisiblePattern = getPatternByCodePoint(codePoint, INVISIBLE_CHARACTER_PATTERNS);
        if (invisiblePattern) {
            hasVisibleSubstitution = true;
            return `[${formatCodePoint(codePoint)} ${getCodePointLabel(codePoint, invisiblePattern.label)}]`;
        }
        const bidiPattern = getPatternByCodePoint(codePoint, BIDI_CONTROL_PATTERNS);
        if (bidiPattern) {
            hasVisibleSubstitution = true;
            return `[${formatCodePoint(codePoint)} ${getCodePointLabel(codePoint, bidiPattern.label)}]`;
        }
        if (codePoint >= 0x0000 && codePoint <= 0x001f || codePoint === 0x007f) {
            hasVisibleSubstitution = true;
            return `[${formatCodePoint(codePoint)} ${getCodePointLabel(codePoint, 'KONTROLLTECKEN')}]`;
        }
        return char;
    }).join('');
    return hasVisibleSubstitution ? formatted : value;
}
function formatRawQueryPart(text, emptyLabel) {
    return String(text != null ? text : '').length ? String(text) : emptyLabel;
}
function appendQueryParamLine(container, label, rawValue, decodedValue, emptyLabel) {
    const line = document.createElement('div');
    const title = document.createElement('strong');
    const rawCode = document.createElement('code');
    const rawDisplay = formatRawQueryPart(rawValue, emptyLabel);
    const interpreted = String(decodedValue != null ? decodedValue : '').length ? formatVisibleQueryText(decodedValue) : emptyLabel;
    const shouldShowInterpretation = interpreted !== rawDisplay;
    title.textContent = `${label}: `;
    rawCode.textContent = rawDisplay;
    line.appendChild(title);
    line.appendChild(rawCode);
    if (shouldShowInterpretation) {
        const interpretedText = document.createElement('span');
        const interpretedCode = document.createElement('code');
        interpretedText.className = CLASS.muted;
        interpretedText.appendChild(document.createTextNode(' tolkat som '));
        interpretedCode.textContent = interpreted;
        interpretedText.appendChild(interpretedCode);
        line.appendChild(interpretedText);
    }
    container.appendChild(line);
}
function renderQueryParams(search) {
    els.outParams.innerHTML = '';
    const decodedEntries = Array.from(new URLSearchParams(search).entries());
    if (!decodedEntries.length) {
        els.outParamsWrap.hidden = true;
        return;
    }
    const rawEntries = parseRawQueryEntries(search);
    els.outParamsWrap.hidden = false;
    decodedEntries.forEach(([decodedKey, decodedValue], index)=>{
        const li = document.createElement('li');
        const rawEntry = rawEntries[index] || {
            rawKey: '',
            rawValue: ''
        };
        appendQueryParamLine(li, 'Nyckel', rawEntry.rawKey, decodedKey, '[tom nyckel]');
        appendQueryParamLine(li, 'Värde', rawEntry.rawValue, decodedValue, '[tomt värde]');
        els.outParams.appendChild(li);
    });
}
// ===== NEW: visual markup rendering =====
function escapeHTML(s) {
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
function makeSegment(kind, text) {
    if (!text) return '';
    const safe = escapeHTML(text);
    const partLabel = escapeHTML(BREAKDOWN_PART_LABELS[kind] || kind);
    return `<span class="${CLASS.breakdownSegment}" data-kind="${kind}" data-part="${kind}" role="button" tabindex="0" aria-label="Visa del: ${partLabel}">${safe}</span>`;
}
function shouldRenderPathPart(url, includeRootPathSegment = false) {
    const hasExplicitPath = Boolean(url.pathname && url.pathname !== '/');
    return hasExplicitPath || includeRootPathSegment;
}
function buildVisualURLParts(u, parts, fallbackHost = '', includeRootPathSegment = false) {
    // parts: {subdomain, domain, tld}
    const protocol = `${u.protocol}//`;
    // Handle credentials (username:password@)
    let credentials = '';
    if (u.username || u.password) {
        const credStr = u.username + (u.password ? `:${u.password}` : '') + '@';
        credentials = makeSegment('credentials', credStr);
    }
    const hostPieces = [];
    if (parts.ipAddress) {
        hostPieces.push(makeSegment('ipAddress', parts.ipAddress));
    } else if (parts.subdomain) {
        hostPieces.push(makeSegment('subdomain', parts.subdomain + '.'));
    }
    if (parts.domain) hostPieces.push(makeSegment('domain', parts.domain));
    if (parts.tld) hostPieces.push(makeSegment('tld', '.' + parts.tld));
    if (!parts.ipAddress && !parts.domain && fallbackHost) hostPieces.push(makeSegment('domain', fallbackHost)); // fallback
    const host = hostPieces.join('');
    const shouldRenderPath = shouldRenderPathPart(u, includeRootPathSegment);
    const path = shouldRenderPath ? makeSegment('path', u.pathname || '/') : '';
    const query = makeSegment('query', u.search || '');
    const hash = makeSegment('hash', u.hash || '');
    return makeSegment('protocol', protocol) + credentials + host + path + query + hash;
}
function buildLegend(availableParts) {
    els.breakdownLegend.innerHTML = '';
    for (const p of BREAKDOWN_PARTS){
        // Only show buttons for parts that exist in the URL
        if (!availableParts.has(p.key)) continue;
        const item = document.createElement('button');
        item.type = 'button';
        item.className = CLASS.breakdownItem;
        item.id = `${BREAKDOWN_ARIA_ID_PREFIX}-${p.key}`;
        item.setAttribute('data-part', p.key);
        item.setAttribute('aria-label', `${p.label} – ${p.desc}`);
        const txt = document.createElement('span');
        txt.innerHTML = `<strong>${p.label}</strong><br/><span class="${CLASS.muted}">${p.desc}</span>`;
        item.appendChild(txt);
        els.breakdownLegend.appendChild(item);
    }
}
function syncBreakdownSegmentAriaDescribedBy() {
    els.breakdownUrl.querySelectorAll(BREAKDOWN_SEGMENT_SELECTOR).forEach((segment)=>{
        const partKey = segment.getAttribute('data-part');
        if (!partKey) return;
        const legendBtn = els.breakdownLegend.querySelector(breakdownItemPartSelector(partKey));
        if (legendBtn && legendBtn.id) segment.setAttribute('aria-describedby', legendBtn.id);
        else segment.removeAttribute('aria-describedby');
    });
}
function clearActive() {
    els.breakdownUrl.querySelectorAll(BREAKDOWN_SEGMENT_SELECTOR).forEach((s)=>{
        s.dataset.active = 'false';
        s.setAttribute('aria-pressed', 'false');
    });
    els.breakdownLegend.querySelectorAll(BREAKDOWN_ITEM_SELECTOR).forEach((b)=>b.dataset.active = 'false');
    els.breakdownSvg.innerHTML = '';
}
function getBoxCenter(el, relativeTo) {
    const r = el.getBoundingClientRect();
    const base = relativeTo.getBoundingClientRect();
    return {
        x: (r.left + r.right) / 2 - base.left,
        y: (r.top + r.bottom) / 2 - base.top
    };
}
function drawLine(fromEl, toEl) {
    const base = els.breakdownWrap; // svg overlays the entire breakdown wrap
    const from = getBoxCenter(fromEl, base);
    const to = getBoxCenter(toEl, base);
    // SVG sized to the breakdown wrap
    const w = base.clientWidth;
    const h = base.clientHeight;
    els.breakdownSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    els.breakdownSvg.setAttribute('width', w);
    els.breakdownSvg.setAttribute('height', h);
    // A polyline with a small dot at each end
    const svg = `
      <line class="${CLASS.breakdownLine}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}"></line>
      <circle class="${CLASS.breakdownDot}" cx="${from.x}" cy="${from.y}" r="3"></circle>
      <circle class="${CLASS.breakdownDot}" cx="${to.x}" cy="${to.y}" r="3"></circle>
    `;
    els.breakdownSvg.innerHTML = svg;
}
function activatePart(partKey) {
    clearActive();
    const segment = els.breakdownUrl.querySelector(breakdownSegmentPartSelector(partKey));
    const legendBtn = els.breakdownLegend.querySelector(breakdownItemPartSelector(partKey));
    if (!segment || !legendBtn) return;
    segment.dataset.active = 'true';
    segment.setAttribute('aria-pressed', 'true');
    legendBtn.dataset.active = 'true';
    showSelectedPartBox(partKey);
    // Wait one frame so layout changes (e.g. detail box visibility) settle before measuring.
    requestAnimationFrame(()=>{
        const liveSegment = els.breakdownUrl.querySelector(breakdownSegmentPartSelector(partKey));
        const liveLegendBtn = els.breakdownLegend.querySelector(breakdownItemPartSelector(partKey));
        if (!liveSegment || !liveLegendBtn) return;
        drawLine(liveSegment, liveLegendBtn);
    });
}
function showSelectedPartBox(partKey) {
    for (const boxKey of Object.values(PART_BOX_MAP)){
        if (els[boxKey]) els[boxKey].style.display = 'none';
    }
    if (!visiblePartState.availability[partKey]) return;
    const selectedBox = PART_BOX_MAP[partKey];
    if (!selectedBox || !els[selectedBox]) return;
    els[selectedBox].style.display = '';
}
function mountDetailBoxesInLegend() {
    if (detailsMountedInLegend || !els.breakdownDetails) return;
    for (const boxKey of Object.values(PART_BOX_MAP)){
        const box = els[boxKey];
        if (box) {
            els.breakdownDetails.appendChild(box);
        }
    }
    if (els.detailsSection) {
        els.detailsSection.style.display = 'none';
    }
    detailsMountedInLegend = true;
}
function setupBreakdownInteractions() {
    // Click on URL segments
    els.breakdownUrl.addEventListener('click', (e)=>{
        const segment = e.target.closest(BREAKDOWN_SEGMENT_SELECTOR);
        if (!segment) return;
        activatePart(segment.dataset.part);
    });
    els.breakdownUrl.addEventListener('keydown', (e)=>{
        const segment = e.target.closest(BREAKDOWN_SEGMENT_SELECTOR);
        if (!segment) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activatePart(segment.dataset.part);
        }
    });
    // Click on legend buttons
    els.breakdownLegend.addEventListener('click', (e)=>{
        const btn = e.target.closest(BREAKDOWN_ITEM_SELECTOR);
        if (!btn) return;
        activatePart(btn.dataset.part);
    });
    // Re-draw line on resize if something is active
    window.addEventListener('resize', ()=>{
        const activeLegend = els.breakdownLegend.querySelector(`${BREAKDOWN_ITEM_SELECTOR}[data-active="true"]`);
        if (!activeLegend) return;
        activatePart(activeLegend.dataset.part);
    });
}
// ===== existing rendering =====
function render(rawInput) {
    els.signals.innerHTML = '';
    els.outParams.innerHTML = '';
    els.outParamsWrap.hidden = true;
    const parsed = parseMaybeURL(rawInput);
    mountDetailBoxesInLegend();
    if (!rawInput.trim()) {
        setVisibleState({
            hasResults: false,
            errorMessage: ''
        });
        els.inputHint.textContent = '';
        setHostSpecialBoxesVisibility(false);
        renderScriptWarnings([]);
        return false;
    }
    if (!parsed.ok) {
        setVisibleState({
            hasResults: false,
            errorMessage: parsed.reason === 'invalid_protocol' ? `Protokollet verkar vara fel eller felstavat (${parsed.protocol}://). Använd http://, https:// eller ftp://.` : 'Kunde inte tolka länken. Kontrollera att den ser ut som en URL.'
        });
        els.inputHint.textContent = '';
        setHostSpecialBoxesVisibility(false);
        renderScriptWarnings([]);
        return false;
    }
    const u = parsed.url;
    els.inputHint.textContent = parsed.schemeMissing ? 'Tips: Länken saknade protokoll – jag antog https:// för att kunna analysera.' : '';
    const ipAddressType = getIPAddressType(u.hostname);
    const normalizedHost = stripIPv6Brackets(u.hostname);
    const { subdomain, domain, tld, registrable } = computeDomainParts(u.hostname);
    const inputHost = extractInputHost(parsed.raw);
    const rawDisplayHost = formatIPAddress(inputHost || u.hostname || '');
    const displayHost = toUnicodeHost(rawDisplayHost);
    const { subdomain: displaySubdomain, domain: displayDomain, tld: displayTld, registrable: displayRegistrable } = computeDomainParts(displayHost);
    const isIpHost = Boolean(ipAddressType);
    const hasTopDomain = Boolean(tld);
    const shouldRenderPath = shouldRenderPathPart(u, Boolean(u.search || u.hash));
    if (!hasTopDomain && !isIpHost) {
        setVisibleState({
            hasResults: false,
            errorMessage: 'Domänen saknar toppdomän (t.ex. .se eller .com). Kontrollera att länken är komplett.'
        });
        els.inputHint.textContent = '';
        setHostSpecialBoxesVisibility(false);
        renderScriptWarnings([]);
        return false;
    }
    const focusHost = isIpHost ? displayHost || normalizedHost || '—' : displayDomain && displayTld ? `${displayDomain}.${displayTld}` : displayRegistrable || '—';
    const invisibleWarnings = detectInvisibleCharacters(parsed.raw);
    const bidiWarnings = detectBidiControlCharacters(parsed.raw);
    const fullwidthWarnings = detectFullwidthCharacters(parsed.raw);
    const nonLatinHostWarnings = detectSuspiciousScripts(displayHost);
    const mixedScriptHostWarning = detectMixedScriptHostname(displayHost);
    const showHostMarkupBox = hasVisibleHostMarkup(displayHost);
    const boxWarnings = [
        ...invisibleWarnings,
        ...bidiWarnings,
        ...fullwidthWarnings,
        ...showHostMarkupBox ? nonLatinHostWarnings : [],
        ...mixedScriptHostWarning ? [
            mixedScriptHostWarning
        ] : []
    ];
    setHostSpecialBoxesVisibility(showHostMarkupBox);
    if (showHostMarkupBox) {
        setSafeMarkup(els.focusHost, buildHostVisualMarkup(displayHost));
    }
    safeText(els.focusRegistrable, focusHost);
    // Determine which parts are available in this URL
    const availableParts = new Set([
        'protocol'
    ]); // protocol always present
    if (u.username || u.password) availableParts.add('credentials');
    if (isIpHost) availableParts.add('ipAddress');
    if (displaySubdomain) availableParts.add('subdomain');
    if (displayDomain) availableParts.add('domain');
    if (displayTld) availableParts.add('tld');
    if (shouldRenderPath) availableParts.add('path');
    if (u.search) availableParts.add('query');
    if (u.hash) availableParts.add('hash');
    // NEW: visual URL and legend
    buildLegend(availableParts);
    els.breakdownUrl.innerHTML = buildVisualURLParts(u, {
        subdomain: displaySubdomain,
        ipAddress: isIpHost ? displayHost : '',
        domain: displayDomain,
        tld: displayTld
    }, displayHost || u.hostname || '', shouldRenderPath);
    syncBreakdownSegmentAriaDescribedBy();
    clearActive();
    // Signals
    if (u.protocol === 'https:') addSignal('HTTPS (krypterad anslutning)', 'good');
    else if (u.protocol === 'http:') addSignal('HTTP (inte krypterat)', 'warn');
    else addSignal(`Protokoll: ${u.protocol.replace(':', '')}`, 'neutral');
    if (ipAddressType === 'ipv4') addSignal('Värd är en IPv4-adress', 'warn');
    if (ipAddressType === 'ipv6') addSignal('Värd är en IPv6-adress', 'warn');
    if (u.username || u.password) addSignal('Inloggningsdel i URL (user:pass@)', 'danger');
    if (parsed.raw.includes('@') && !u.username && !u.password) addSignal('Innehåller @ (kan vara vilseledande)', 'warn');
    if (u.hostname.startsWith('xn--') || u.hostname.includes('.xn--')) addSignal('IDN-domän', 'warn');
    if (subdomain && subdomain.split('.').length >= 3) addSignal('Många subdomäner', 'warn');
    renderScriptWarnings(boxWarnings);
    if (invisibleWarnings.length) addSignal('Osynliga tecken i länken', 'danger');
    if (bidiWarnings.length) addSignal('Bidi-styrtecken i länken', 'danger');
    if (fullwidthWarnings.length) addSignal('Fullbreddstecken i länken', 'warn');
    if (nonLatinHostWarnings.length) addSignal('Icke-latinska tecken i domänen', 'warn');
    if (mixedScriptHostWarning) addSignal('Blandade teckenuppsättningar i domänen', 'danger');
    const qp = new URLSearchParams(u.search);
    const qpCount = Array.from(qp.keys()).length;
    if (qpCount >= 6) addSignal(`Många parametrar (${qpCount})`, 'warn');
    else if (qpCount > 0) addSignal(`Parametrar: ${qpCount}`, 'neutral');
    // Outputs
    safeText(els.outProtocol, u.protocol ? `${u.protocol}//` : '—');
    safeText(els.outUsername, u.username || '—');
    safeText(els.outPassword, u.password || '—');
    safeText(els.outSubdomain, displaySubdomain || '—');
    safeText(els.outIpAddress, isIpHost ? displayHost : '—');
    safeText(els.outIpVersion, ipAddressType ? ipAddressType === 'ipv4' ? 'IPv4' : 'IPv6' : '—');
    safeText(els.outDomain, displayDomain || '—');
    safeText(els.outTld, displayTld || '—');
    safeText(els.outPath, shouldRenderPath ? u.pathname || '/' : '—');
    const folders = (u.pathname || '/').split('/').filter(Boolean);
    safeText(els.outFolders, shouldRenderPath ? folders.length ? folders.join(' → ') : '/' : '—');
    // Query
    if (u.search) {
        safeText(els.outQuery, u.search);
        renderQueryParams(u.search);
    } else {
        safeText(els.outQuery, '—');
        els.outParams.innerHTML = '';
        els.outParamsWrap.hidden = true;
    }
    safeText(els.outHash, u.hash || '—');
    visiblePartState.availability = {
        protocol: true,
        credentials: Boolean(u.username || u.password),
        subdomain: Boolean(subdomain),
        ipAddress: isIpHost,
        domain: Boolean(domain),
        tld: Boolean(tld),
        path: shouldRenderPath,
        query: Boolean(u.search),
        hash: Boolean(u.hash)
    };
    const defaultPart = [
        'protocol',
        'ipAddress',
        'domain',
        'tld',
        'subdomain',
        'path',
        'query',
        'hash',
        'credentials'
    ].find((k)=>visiblePartState.availability[k]) || 'protocol';
    setTimeout(()=>activatePart(defaultPart), 0);
    setVisibleState({
        hasResults: true,
        errorMessage: ''
    });
    return true;
}
if (shouldInitUrlChecker) {
    // Debounced live parsing
    let t = null;
    let shouldScrollToOverviewOnNextAnalyze = false;
    let blockAutoScrollUntilManualAnalyze = false;
    const analyze = (value)=>{
        const didPassValidation = render(value);
        if (didPassValidation) trackUrlAnalysis();
        if (!shouldScrollToOverviewOnNextAnalyze) return;
        if (blockAutoScrollUntilManualAnalyze) {
            shouldScrollToOverviewOnNextAnalyze = false;
            return;
        }
        const errorIsVisible = Boolean(els.urlInputFieldGroup && els.urlInputFieldGroup.classList.contains('is-invalid') && els.urlInputHelp && els.urlInputHelp.textContent.trim().length);
        shouldScrollToOverviewOnNextAnalyze = false;
        const target = errorIsVisible ? els.urlInputHelp : document.getElementById('overview');
        if (!target) return;
        (0, _anchorScroll.animateAnchorScroll)(target, null, {
            easing: 'easeOut',
            speedAsDuration: false
        });
    };
    els.urlInput.addEventListener('paste', ()=>{
        shouldScrollToOverviewOnNextAnalyze = true;
    });
    els.urlInput.addEventListener('input', (event)=>{
        const inputType = (event == null ? void 0 : event.inputType) || '';
        const isPasteInput = inputType === 'insertFromPaste';
        if (!isPasteInput) {
            blockAutoScrollUntilManualAnalyze = true;
            shouldScrollToOverviewOnNextAnalyze = false;
        }
        clearTimeout(t);
        if (shouldScrollToOverviewOnNextAnalyze) {
            analyze(els.urlInput.value);
            return;
        }
        t = setTimeout(()=>analyze(els.urlInput.value), 1000);
    });
    els.analyzeBtn.addEventListener('click', ()=>{
        blockAutoScrollUntilManualAnalyze = false;
        shouldScrollToOverviewOnNextAnalyze = Boolean(els.urlInput.value.trim());
        analyze(els.urlInput.value);
    });
    els.clearBtn.addEventListener('click', ()=>{
        shouldScrollToOverviewOnNextAnalyze = false;
        blockAutoScrollUntilManualAnalyze = false;
        els.urlInput.value = '';
        render('');
        els.urlInput.focus();
    });
    // Init breakdown interactions once
    setupBreakdownInteractions();
}
// ===== Accordion functionality =====
function initAccordions() {
    document.querySelectorAll('.iis-o-accordion__header').forEach((button)=>{
        if (button.dataset.accordionInit) return; // Already initialized
        button.dataset.accordionInit = 'true';
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const panelId = this.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            if (!panel) return;
            // Toggle states
            this.setAttribute('aria-expanded', !isExpanded);
            panel.setAttribute('aria-hidden', isExpanded);
            // Toggle visibility
            if (isExpanded) {
                panel.style.maxHeight = '0';
                panel.style.opacity = '0';
                panel.style.visibility = 'hidden';
                panel.style.overflow = 'hidden';
            } else {
                panel.style.visibility = 'visible';
                panel.style.maxHeight = '1000px';
                panel.style.opacity = '1';
                panel.style.overflow = 'visible';
            }
        });
    });
}
if (shouldInitUrlChecker) {
    // Watch for new accordions being added
    const accordionObserver = new MutationObserver(()=>{
        initAccordions();
    });
    accordionObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    render('');
}
