import '../styles/main.scss';

import gecko from './components/gecko-o-meter';
import gauge from './components/gauge';

import data from './data/graph-data';

var elem = document.getElementById('app');
gecko(elem, gauge, data);
