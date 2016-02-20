/**
 * Created by liangwensen on 2/20/16.
 */
import fetch from 'zero-net/fetch';
import domQuery from 'zero-dom/query';
import mpr from '../src/index';

fetch('../doc/features.md')
    .then(function (res) {
        return res.text();
    })
    .then(function (markdownString) {
        mpr.render(domQuery.one('#container'), markdownString);
    });
