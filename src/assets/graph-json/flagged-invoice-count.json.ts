const jsonData = {
  xTitle: 'Invoices',
  yTitle: 'Flags',
  xLabels: [
    'inv1',
    'inv2',
    'inv4',
    'inv8',
    'inv16',
    'inv32',
    'inv64',
    'inv128',
    'inv256',
    'inv512',
  ],
  yLabels: [
    'Remit To Missing/Wrong',
    'Customer Address Wrong/Missing',
    'Customer Aging Hold',
    'Invoice PDF does not match terms',
    'Invoice PDF does not match submitted Invoice Date, Number and/or Amount',
    'NeedCredit',
  ],
  datasets: [
    {
      label: 'Flagged Invoice Count',
      data: [
        {
          x: 'inv256',
          y: 'Invoice PDF does not match submitted Invoice Date, Number and/or Amount',
        },
        {
          x: 'inv2',
          y: 'NeedCredit',
        },
        {
          x: 'inv4',
          y: 'NeedCredit',
        },
        {
          x: 'inv16',
          y: 'Customer Address Wrong/Missing',
        },
        {
          x: 'inv64',
          y: 'NeedCredit',
        },
        {
          x: 'inv64',
          y: 'Customer Address Wrong/Missing',
        },
        {
          x: 'inv2',
          y: 'Customer Aging Hold',
        },
        {
          x: 'inv2',
          y: 'Invoice PDF does not match submitted Invoice Date, Number and/or Amount',
        },
        {
          x: 'inv32',
          y: 'Customer Address Wrong/Missing',
        },
        {
          x: 'inv8',
          y: 'Invoice PDF does not match submitted Invoice Date, Number and/or Amount',
        },
      ],
    },
  ],
};

export default jsonData;
