const jsonData = {
  xTitle: 'Customers',
  yTitle: 'Customer Credit',
  labels: [
    'Lueilwitz Inc',
    'Glover, Kassulke and Schinner',
    'Schneider Inc',
    'Pfeffer - Turner',
    'West LLC',
    'Rippin Group',
    'Farrell and Sons',
    'Bergnaum and Sons',
    'Predovic - Terry',
    'Collier - Franecki',
  ],
  datasets: [
    {
      label: 'Utilized',
      data: [
        95771.9, 82121.56, 77748.46, 67459.65, 58355.15, 62427.53, 85384.11,
        74177.51, 94118.03, 79574.42,
      ],
      stack: 'stack 0',
    },
    {
      label: 'Unutilized',
      data: [
        28051.24, 24312.93, 6318.95, 24195.96, 8339.4, 11046.95, 11647.15,
        18917.13, 14506.41, 17858.29,
      ],
      stack: 'stack 0',
    },
    {
      label: 'Pending',
      data: [
        9222.72, 45450.94, 46921.2, 13229.37, 41509.61, 42267.75, 46665.9,
        19072.58, 17303.91, 848.67,
      ],
      stack: 'stack 1',
    },
  ],
};

export default jsonData;
