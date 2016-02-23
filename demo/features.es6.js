/**
 * Created by liangwensen on 2/20/16.
 */
import fetch from 'zero-net/fetch';
import domQuery from 'zero-dom/query';
import win from 'zero-lang/global';

let mpr = win.mpr;

fetch('../doc/features.md?raw')
    .then(function (res) {
        return res.text();
    })
    .then(function (markdownString) {
        mpr.render(domQuery.one('#container'), markdownString);
    });
