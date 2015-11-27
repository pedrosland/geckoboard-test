import '../styles/main.scss';

import gecko from './components/gecko-o-meter';
import gauge from './components/gauge';

var elem = document.getElementById('app');

// To use sample data, uncomment these lines and comment the ones below
//import {sample} from './data/graph-data';
//gecko(elem, gauge, sample);

import {poll} from './data/graph-data';
gecko(elem, gauge, poll.log());
