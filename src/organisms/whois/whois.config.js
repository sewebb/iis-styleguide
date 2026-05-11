const datesRows = require('./whois-domain-dates-volvo.json');
const otherRows = require('./whois-domain-other-volvo.json');

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

const datesTableRows = datesRows.filter(({ field }) => ![
	'Skapad',
	'Senast ändrad',
].includes(field?.label));

const otherTableRows = otherRows.filter(({ field }) => ![
	'Länk till sökresultat',
	'Kontakta domäninnehavaren',
].includes(field?.label));

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
				content: `<a href="/sok-doman?domain=${escapeHtml(domain)}">${escapeHtml(domain)}</a>`,
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
				content: `<a href="/sok-doman?domain=${escapeHtml(item.domain)}">${escapeHtml(item.domain)}</a>`,
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

	context: {},

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
					'Domänen är tillgänglig att registrera via en registrar.',
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
				domain_dates_table_context: {
					...mapRowsToTableContext(datesTableRows),
					headers: [
						{
							label: 'Datum',
							colspan: 2,
						},
					],
				},
				domain_other_table_context: {
					...mapRowsToTableContext(otherTableRows),
					headers: [
						{
							label: 'Övrigt',
							colspan: 2,
						},
					],
				},
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
	],
};
