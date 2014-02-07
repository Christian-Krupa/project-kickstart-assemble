# The Icons-Folder

Put your SVG-Icons in here.  

All icons will be processed with the svgmin-task and put into the `svgmin`-folder.  
Afterwards the grunticon-task uses these icons to produce  

- PNG-fallback-files, which will be put into the `png-fallback`-folder
- SCSS-files (all icons are included as data-URIs), which will be put into `sass/grunticon`
