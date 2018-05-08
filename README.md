
FTWK Website
============================


### File structure

    .
    ├── node_modules            
    ├── src  
    │   ├── components          # All reusable components, navigation and CMS etc.      
    │   ├── content             # json content map, should become redundant, move to CMS
    │   ├── css                 # main.css & variables.css
    │   ├── fonts
    │   ├── img
    │   ├── plugins             # 3rd party plugins
    │   ├── video
    │   ├── index.js            # the main controls, page initialization, routing etc.
    ├── postcss.config.js
    ├── README.md
    └── webpack.config.js


### Installation

After cloning the repository, cd into the project root, run <b>'npm install'</b>, then <b>'npm start'</b>.<br>
For the production build, run <b>'npm run build'</b> to create the <b>'dist'</b> folder.
