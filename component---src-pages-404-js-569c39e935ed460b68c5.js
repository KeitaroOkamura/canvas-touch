(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{143:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(158),s=a(156);e.default=function(){return r.a.createElement(i.a,null,r.a.createElement(s.a,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},151:function(t,e,a){var n;t.exports=(n=a(155))&&n.default||n},152:function(t,e,a){"use strict";a.d(e,"b",function(){return l});var n=a(0),r=a.n(n),i=a(4),s=a.n(i),o=a(33),c=a.n(o);a.d(e,"a",function(){return c.a});a(151);var u=r.a.createContext({}),l=function(t){return r.a.createElement(u.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};l.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},154:function(t){t.exports={data:{site:{siteMetadata:{title:"React Canvas Demo"}}}}},155:function(t,e,a){"use strict";a.r(e);a(34);var n=a(0),r=a.n(n),i=a(4),s=a.n(i),o=a(56),c=a(2),u=function(t){var e=t.location,a=c.default.getResourcesForPathnameSync(e.pathname);return a?r.a.createElement(o.a,Object.assign({location:e,pageResources:a},a.json)):null};u.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},e.default=u},156:function(t,e,a){"use strict";var n=a(157),r=a(0),i=a.n(r),s=a(4),o=a.n(s),c=a(162),u=a.n(c);function l(t){var e=t.description,a=t.lang,r=t.meta,s=t.keywords,o=t.title,c=n.data.site,l=e||c.siteMetadata.description;return i.a.createElement(u.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:o},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:l}].concat(s.length>0?{name:"keywords",content:s.join(", ")}:[]).concat(r)})}l.defaultProps={lang:"en",meta:[],keywords:[],description:""},l.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.arrayOf(o.a.object),keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},e.a=l},157:function(t){t.exports={data:{site:{siteMetadata:{title:"React Canvas Demo",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}},158:function(t,e,a){"use strict";var n=a(154),r=a(0),i=a.n(r),s=a(4),o=a.n(s),c=a(152),u=a(211),l=function(t){var e=t.siteTitle;return i.a.createElement(u.a,null,i.a.createElement("h1",null,e))};l.propTypes={siteTitle:o.a.string},l.defaultProps={siteTitle:""};var d=l,p=(a(160),a(161),function(t){var e=t.children;return i.a.createElement(c.b,{query:"755544856",render:function(t){return i.a.createElement(i.a.Fragment,null,i.a.createElement(d,{siteTitle:t.site.siteMetadata.title}),i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"main"},i.a.createElement("main",null,e))))},data:n})});p.propTypes={children:o.a.node.isRequired};e.a=p}}]);
//# sourceMappingURL=component---src-pages-404-js-569c39e935ed460b68c5.js.map