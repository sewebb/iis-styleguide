const datesRows = require('./whois-domain-dates-volvo.json');
const otherRows = require('./whois-domain-other-volvo.json');
const retailersRaw = require('./whois-retailers.json');

const whoisI18n = {
	selectSearchTypePlaceholder: 'Välj först vad du vill söka efter...',
	emptySearchError: 'Du måste ange en sökning.',
	domainSearchError: 'Sökningen måste sluta med .se eller .nu.',
	domainSearchCharactersError: 'Domännamn får bara innehålla bokstäver, siffror, bindestreck och punkt.',
	keywordSearchCharactersError: 'Nyckelordet får bara innehålla bokstäver och siffror.',
	keywordSearchLengthError: 'Sökordet måste innehålla minst 3 tecken.',
	organisationSearchError: 'Organisationsnumret måste anges i formatet XXXXXX-XXXX.',
};

const whoisInfoBoxes = [
	{
		title: 'Återförsäljare',
		url: '#',
		backgroundClass: 'background-ash',
		iconSrc: 'https://cdn.lordicon.com/fmsilsqx.json',
		iconColor: '#55c7b4',
		hasBorder: true,
		bodyHtml:
			'Du registrerar ditt .se- eller .nu-domännamn hos någon av Internetstiftelsens återförsäljare, så kallade registrarer. Här kan du se vilka det finns att välja på.',
	},
	{
		title: 'Utlämnande av uppgifter',
		url: '#',
		backgroundClass: 'background-ash',
		iconSrc: 'https://cdn.lordicon.com/tnapqovl.json',
		iconColor: '#50b2fc',
		hasBorder: true,
		bodyHtml:
			'För innehavare som är privatpersoner/enskild firma visas inga kontaktuppgifter. Här kan du läsa mer om hur du begär att ta del av den information som döljs.',
	},
	{
		title: 'Vanliga frågor och svar',
		url: '#',
		backgroundClass: 'background-ash',
		iconSrc: 'https://cdn.lordicon.com/ojnjgkun.json',
		iconColor: '#ffce2e',
		hasBorder: true,
		bodyHtml:
			'Har du frågor om domännamn, sökresultat eller hur tjänsten fungerar? På våra hjälpsidor hittar du vanliga frågor och svar som hjälper dig vidare.',
	},
	{
		title: 'Registreringsvillor',
		url: '#',
		backgroundClass: 'background-ocean-light',
		iconSrc: 'https://cdn.lordicon.com/mdjanuie.json',
		iconColor: '#50b2fc',
		bodyHtml:
			'Vilka tecken är tillåtna i en .se- eller .nu-adress? Och vilka domännamn är inte möjliga att registrera? Här har vi samlat villkor och regler som är bra att hålla koll på när du ska registrera ett domännamn.',
	},
	{
		title: 'Om domännamnssökningar',
		url: '#',
		backgroundClass: 'background-lemon-light',
		iconSrc: 'https://cdn.lordicon.com/vayiyuqd.json',
		iconColor: '#ffce2e',
		bodyHtml:
			'Med Internetstiftelsens kontaktsökning får du information om den domän du sökt. Tjänsten används för att slå upp specifika domännamn och innehavare via WHOIS-protokollet.',
	},
	{
		title: 'Friendly Captcha',
		url: '#',
		backgroundClass: 'background-concrete',
		iconSrc: 'https://cdn.lordicon.com/sqhugsql.json',
		iconColor: '#8E9297',
		bodyHtml:
			'Den här sidan skyddas av Friendly Captcha och du kan läsa mer om personuppgiftsbehandlingen här.',
	},
];

const retailerFeatureDefinitions = [
	{ tag: 'registration__reg_idn', label: 'Erbjuder registrering av IDN-domännamn' },
	{ tag: 'registration__reg_private', label: 'Erbjuder registrering till privatpersoner' },
	{ tag: 'registration__domain_only', label: 'Erbjuder registrering av domännamn utan krav på avtal om andra tjänster' },
	{ tag: 'registration__domain_multiyear', label: 'Erbjuder nyregistrering och förnyelse av domännamn med mer än 1 år i taget' },
	{ tag: 'registration__is_reseller', label: 'Erbjuder registreringstjänster via underåterförsäljare.' },
	{ tag: 'technical__serv_dns', label: 'Erbjuder DNS-tjänster' },
	{ tag: 'technical__serv_dnssec', label: 'Erbjuder DNSSEC' },
	{ tag: 'technical__serv_web', label: 'Erbjuder webbhotell' },
	{ tag: 'technical__serv_email', label: 'Erbjuder e-posttjänst' },
	{ tag: 'technical__reg_lock', label: 'Erbjuder Registry lock' },
	{ tag: 'associations__registrars_se_member', label: 'Medlem i Registrars.se' },
];

const cleanRetailerFeatureLabel = (label) => String(label || '')
	.replace(/^Erbjuder\s+/i, '')
	.replace(/\.$/, '');

const mapRetailerItem = (retailer) => ({
	...retailer,
	tag_string: retailer.tags.join(' '),
	features: retailerFeatureDefinitions.map((feature) => ({
		tag: feature.tag,
		label: feature.label,
		displayLabel: cleanRetailerFeatureLabel(feature.label),
		available: retailer.tags.includes(feature.tag),
	})),
	feature_sections: [
		{
			heading: 'Erbjuder',
			items: retailerFeatureDefinitions
				.filter((feature) => retailer.tags.includes(feature.tag))
				.map((feature) => ({
					label: cleanRetailerFeatureLabel(feature.label),
					available: true,
				})),
		},
		{
			heading: 'Erbjuder inte',
			items: retailerFeatureDefinitions
				.filter((feature) => !retailer.tags.includes(feature.tag))
				.map((feature) => ({
					label: cleanRetailerFeatureLabel(feature.label),
					available: false,
				})),
		},
	],
	tlds: [
		retailer.tags.includes('tld__se') ? '.se' : null,
		retailer.tags.includes('tld__nu') ? '.nu' : null,
	].filter(Boolean),
});

const retailerDirectoryItems = retailersRaw.map(mapRetailerItem);

const escapeHtml = (value) => String(value ?? '')
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#039;');

const renderTooltip = (tooltip) => {
	if (!tooltip) {
		return '';
	}

	const label = tooltip.label || 'Visa mer information';
	const placement = tooltip.placement || 'top';

	return `<button type="button" class="a-tooltip a-tooltip--small a-button a-button--standalone-icon a-button--icon" aria-label="${escapeHtml(label)}" data-tooltip-placement="${escapeHtml(placement)}">
		<span class="a-tooltip__text" hidden>${escapeHtml(tooltip.text)}</span>
		<svg class="icon a-button__icon" aria-hidden="true">
			<use xlink:href="#icon-info"></use>
		</svg>
	</button>`;
};

const renderField = (field) => {
	if (!field) {
		return '';
	}

	const tooltip = field.tooltip ? ` ${renderTooltip(field.tooltip)}` : '';

	return `<div class="display-flex align-items-center justify-content-between"><span>${escapeHtml(field.label)}</span>${tooltip}</div>`;
};

const renderLink = (link) => {
	if (!link) {
		return '';
	}

	const target = link.external ? ' target="_blank" rel="noopener"' : '';
	const icon = link.external
		? ' <svg class="icon o-mega-menu__link__icon"><use xlink:href="#icon-external-link"></use></svg>'
		: '';

	return `<a href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.text)}${icon}</a>`;
};

const renderValue = (value) => {
	if (!value) {
		return '';
	}

	if (Array.isArray(value.lines)) {
		return value.lines.map(escapeHtml).join('<br>');
	}

	if (value.link) {
		return renderLink(value.link);
	}

	return escapeHtml(value.text || '');
};

const mapRowsToTableContext = (rows) => ({
	modifier: 'm-table--lines',
	rows: rows.map(({ field, value }) => ({
		cells: [
			{
				className: 'caption',
				content: renderField(field),
			},
			{
				content: renderValue(value),
			},
		],
	})),
});

const withSectionHeader = (label, rows) => ({
	...mapRowsToTableContext(rows),
	headers: [
		{
			label,
			colspan: 2,
		},
	],
});

const datesTableRows = datesRows.filter(({ field }) => ![
	'Skapad',
	'Senast ändrad',
].includes(field?.label));

const otherTableRows = otherRows.filter(({ field }) => ![
	'Länk till sökresultat',
	'Kontakta domäninnehavaren',
].includes(field?.label));

const updateRowValue = (rows, label, text) => rows.map((row) => (
	row.field?.label === label
		? {
			...row,
			value: {
				...row.value,
				text,
			},
		}
		: row
));

const replaceRowValue = (rows, label, value) => rows.map((row) => (
	row.field?.label === label
		? {
			...row,
			value,
		}
		: row
));

const quarantineDatesTableRows = updateRowValue(
	updateRowValue(
		updateRowValue(
			datesTableRows,
			'Deaktiveringsdatum',
			'2026-10-25',
		),
		'Avregistreringsdatum',
		'2026-12-25',
	),
	'Datum för frisläppande',
	'2027-01-25',
);

const quarantineOtherTableRows = replaceRowValue(
	replaceRowValue(
		updateRowValue(
			updateRowValue(
				updateRowValue(
					otherTableRows,
					'Domänstatus',
					'Quarantine',
				),
				'DNSSEC',
				'',
			),
			'Registry lock',
			'',
		),
		'Status',
		{
			lines: [
				'inactive',
				'pendingDelete',
				'serverHold',
			],
		},
	),
	'Namnserver',
	{
		text: '',
	},
);

const keywordRegistrarGroups = [
	{
		name: 'CSC Corp Domains',
		domains: [
			'volvo.nu',
			'volvo.se',
			'volvocars.nu',
			'volvocars.se',
			'volvopenta.se',
		],
	},
	{
		name: 'Loopia AB',
		domains: [
			'volvobilar.nu',
			'volvobilar.se',
			'volvoklubben.se',
			'volvoservice.se',
			'volvotruckcenter.se',
		],
	},
	{
		name: 'Ports Group AB',
		domains: [
			'volvobussar.se',
			'volvocarretail.se',
			'volvoce.se',
			'volvofinans.se',
			'volvotrucks.se',
		],
	},
].map((group) => ({
	...group,
	domains: [...group.domains].sort((a, b) => a.localeCompare(b, 'sv')),
}));

const mapKeywordRegistrarTableContext = ({ name, domains }) => ({
	modifier: 'm-table--lines',
	headers: [
		{
			label: name,
			colspan: 1,
		},
	],
	rows: domains.map((domain) => ({
		cells: [
			{
				content: `<a class="u-link-normal u-decoration-underline" href="/sok-doman?domain=${escapeHtml(domain)}">${escapeHtml(domain)}</a>`,
			},
		],
	})),
});

const organisationRegistrarGroups = [
	{
		name: 'CSC Corp Domains',
		domains: [
			{ domain: 'volvo.nu', registryLock: 'Ja', dnssec: 'Nej' },
			{ domain: 'volvo.se', registryLock: 'Nej', dnssec: 'Ja' },
			{ domain: 'volvocars.nu', registryLock: 'Nej', dnssec: 'Nej' },
			{ domain: 'volvocars.se', registryLock: 'Ja', dnssec: 'Ja' },
			{ domain: 'volvopenta.se', registryLock: 'Nej', dnssec: 'Ja' },
		],
	},
	{
		name: 'Loopia AB',
		domains: [
			{ domain: 'volvobilar.nu', registryLock: 'Nej', dnssec: 'Nej' },
			{ domain: 'volvobilar.se', registryLock: 'Ja', dnssec: 'Ja' },
			{ domain: 'volvoklubben.se', registryLock: 'Nej', dnssec: 'Ja' },
			{ domain: 'volvoservice.se', registryLock: 'Nej', dnssec: 'Nej' },
			{ domain: 'volvotruckcenter.se', registryLock: 'Ja', dnssec: 'Ja' },
		],
	},
	{
		name: 'Ports Group AB',
		domains: [
			{ domain: 'volvobussar.se', registryLock: 'Ja', dnssec: 'Nej' },
			{ domain: 'volvocarretail.se', registryLock: 'Nej', dnssec: 'Ja' },
			{ domain: 'volvoce.se', registryLock: 'Ja', dnssec: 'Ja' },
			{ domain: 'volvofinans.se', registryLock: 'Nej', dnssec: 'Nej' },
			{ domain: 'volvotrucks.se', registryLock: 'Ja', dnssec: 'Ja' },
		],
	},
].map((group) => ({
	...group,
	domains: [...group.domains].sort((a, b) => a.domain.localeCompare(b.domain, 'sv')),
}));

const mapOrganisationRegistrarTableContext = ({ name, domains }) => ({
	modifier: 'm-table--lines',
	headerRows: [
		{
			cells: [
				{
					label: name,
					className: 'u-font-size-base',
					colspan: 3,
				},
			],
		},
		{
			cells: [
				{
					label: 'Domän',
					className: 'u-font-size-medium',
					scope: 'col',
				},
				{
					label: 'Registry<br>lock',
					className: 'u-align-center u-font-size-medium',
					scope: 'col',
				},
				{
					label: 'DNSSEC',
					className: 'u-align-center u-nowrap u-font-size-medium',
					scope: 'col',
				},
			],
		},
	],
	rows: domains.map((item) => ({
		cells: [
			{
				content: `<a class="u-link-normal u-decoration-underline" href="/sok-doman?domain=${escapeHtml(item.domain)}">${escapeHtml(item.domain)}</a>`,
			},
			{
				content: escapeHtml(item.registryLock),
				className: 'u-align-center',
			},
			{
				content: escapeHtml(item.dnssec),
				className: 'u-align-center',
			},
		],
	})),
});

module.exports = {
	status: 'wip',

	context: {
		whois_i18n_json: JSON.stringify(whoisI18n),
		whois_initial_placeholder: whoisI18n.selectSearchTypePlaceholder,
		whois_info_boxes: whoisInfoBoxes,
	},

	variants: [
		{
			name: 'domain-available',
			context: {
				result: true,
				result_available: true,
				radio_context: {
					selected_value: 'first',
				},
				search_value: 'volvon.se',
				result_heading: 'är ledig',
				result_text:
					'Domänen är tillgänglig att registrera via en av våra återförsäljare.',
				register_url: '#',
			},
		},
		{
			name: 'domain-taken',
			context: {
				result: true,
				result_taken: true,
				radio_context: {
					selected_value: 'first',
				},
				search_value: 'volvo.se',
				result_heading: 'är redan registrerad',
				result_text:
					'Information om domänens innehavare och registrering visas här.',
				domain_dates_table_context: withSectionHeader('Datum', datesTableRows),
				domain_other_table_context: withSectionHeader('Övrigt', otherTableRows),
			},
		},
		{
			name: 'domain-in-quarantine',
			context: {
				result: true,
				result_quarantine: true,
				result_taken: true,
				radio_context: {
					selected_value: 'first',
				},
				search_value: 'volvo.se',
				result_heading: 'blir ledig 2027-01-25',
				result_text:
					'Information om domänens innehavare och registrering visas här.',
				domain_dates_table_context: withSectionHeader('Datum', quarantineDatesTableRows),
				domain_other_table_context: withSectionHeader('Övrigt', quarantineOtherTableRows),
			},
		},
		{
			name: 'keyword-search',
			context: {
				result: true,
				result_keyword: true,
				radio_context: {
					selected_value: 'second',
				},
				search_value: 'volvo',
				result_heading: 'Sökresultat för nyckelordet volvo',
				result_text:
					'Här visas alla registrerade .se- och .nu-domäner med detta nyckelord grupperade per registrar.',
				keyword_registrar_tables: keywordRegistrarGroups.map(
					(group) => ({
						name: group.name,
						table_context: mapKeywordRegistrarTableContext(group),
					}),
				),
			},
		},
		{
			name: 'organisation-number',
			context: {
				result: true,
				result_organisation: true,
				radio_context: {
					selected_value: 'third',
				},
				search_value: '556810-8988',
				result_heading:
					'Sökresultat för organisationsnummer 556810-8988',
				result_text:
					'Här visas alla .se- och .nu-domäner registrerade med detta organisationsnummer grupperade per registrar.',
				organisation_company_name: 'AB VOLVO',
				organisation_registrar_tables: organisationRegistrarGroups.map(
					(group) => ({
						name: group.name,
						table_context: mapOrganisationRegistrarTableContext(group),
					}),
				),
			},
		},
		{
			name: 'retailers',
			context: {
				result: true,
				result_retailers: true,
				hide_search_form: true,
				hide_info_boxes: true,
				page_title: 'Återförsäljare',
				page_preamble:
					'Du registrerar',
				page_preamble2: 'hos någon av Internetstiftelsens återförsäljare, så kallade registrarer. Här kan du se vilka det finns att välja på.',
				page_domain: 'volvon.se',
				retailer_total_count: retailerDirectoryItems.length,
				retailer_items: retailerDirectoryItems,
			},
		},
	],
};
