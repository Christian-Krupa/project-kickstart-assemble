module.exports = function(grunt) {
	
	// Require it at the top and pass in the grunt instance
	require('time-grunt')(grunt);
	
	// All configuration goes here 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Configuration for assemble
		assemble: {
			options: {
				data: 'source/assemble/data/**/*.{json,yml}',
				helpers: 'source/assemble/helpers/**/*.js',
				layoutdir: 'source/assemble/layouts/',
				partials: 'source/assemble/partials/**/*.hbs'
			},
			dev: {
				files: [
					{
						cwd: 'source/assemble/pages/',
						dest: 'build/',
						expand: true,
						flatten: true,
						src: ['**/*.hbs']
					}
				]
			},
			dist: {
				files: [
					{
						cwd: 'source/assemble/pages/',
						dest: 'dist/',
						expand: true,
						flatten: true,
						src: ['**/*.hbs']
					}
				]
			}
		},
		
		// Configuration for autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9'],
			},
			dev: {
				options: {
					map: true
				},
				src: 'build/css/*.css'
			},
			dist: {
				src: 'dist/css/*.css'
			}
		},
		
		// Configuration for deleting files
		clean: {
			dev: {
				files: [
					{
						filter: 'isFile',
						src: ['build/**/*', '!build/.svn/**', '!build/**/.svn/**', '!build/photobox/**/*']
					}
				]
			},
			dist: {
				files: [
					{
						filter: 'isFile',
						src: ['dist/**/*']
					}
				]
			}
		},
		
		// Configuration for combining media-queries
		cmq: {
			options: {
				log: false
			},
			dist: {
				files: {
					'dist/css/styles.css': ['dist/css/styles.css']
				}
			}
		},
		
		// Configuration for compass
		compass: {
			options: {
				debugInfo: false,
				imagesDir: 'source/img',
				raw: [
					'http_path = "/"',
					'Sass::Script::Number.precision = 8',
					'sass_options = {',
					'  :read_cache => true,',
					'}'
				].join("\n"),
				require: ['sass-globbing'],
				sassDir: 'source/sass'
			},
			dev: {
				options: {
					cssDir: 'build/css',
					environment: 'development',
					force: true,
					javascriptsDir: 'build/js',
					noLineComments: false,
					outputStyle: 'expanded',
					raw: [
						'sass_options = {',
						'  :sourcemap => true', // this set to 'true' has no effect, if you aren't using sass >= 3.3
						'}'
					].join("\n"),
					sourcemap: true // this set to 'true' has no effect, if you aren't using sass >= 3.3
				}
			},
			dist: {
				options: {
					cssDir: 'dist/css',
					environment: 'production',
					force: true,
					javascriptsDir: 'dist/js',
					noLineComments: true,
					outputStyle: 'compressed',
					sourcemap: false
				}
			}
		},
		
		// Configuration for livereload
		connect: {
			livereload: {
				options: {
					base: 'build',
					hostname: '0.0.0.0',
					port: 9002,
					middleware: function(connect, options) {
						return [
							require('connect-livereload')({
								port: 35730
							}),
							connect.static(options.base),
							connect.directory(options.base)
						]
					}
				},
				files: {
					src: ['*/*.html']
				}
			}
		},
		
		// Configuration for copying files
		copy: {
			ajax: {
				cwd: 'source/ajax-content/',
				dest: 'dist/ajax-content/',
				expand: true,
				src: ['**/*']
			},
			favicon: {
				cwd: 'source/img/',
				dest: 'dist/img/',
				expand: true,
				src: ['**/*.ico']
			},
			fonts: {
				cwd: 'source/fonts/',
				dest: 'dist/fonts/',
				expand: true,
				src: ['**/*']
			},
			js: {
				cwd: 'source/js/',
				dest: 'dist/js/',
				expand: true,
				src: ['**/*']
			},
			styleguide: {
				cwd: 'build/css/',
				dest: 'dist/styleguide/css/',
				expand: true,
				filter: 'isFile',
				flatten: true,
				src: ['**/*.css']
			}
		},
		
		// Configuration for minifying css-files
		cssmin: {
			dist: {
				files: {
					'dist/css/styles.css': ['dist/css/styles.css']
				}
			}
		},
		
		// Configuration for managing SVG-icons
		grunticon: {
			options: {
				cssprefix: '%icon-',
				datapngcss: '_icons-data-png.scss',
				datasvgcss: '_icons-data-svg.scss',
				loadersnippet: 'grunticon-loader.js',
				pngfolder: '../../img/icons/png-fallback',
				previewhtml: 'preview.html',
				urlpngcss: '_icons-fallback.scss'
			},
			all: {
				files: [
					{
						cwd: 'source/img/icons/svgmin',
						dest: 'source/sass/grunticon',
						expand: true,
						src: ['*.svg']
					}
				]
			}
		},
		
		// Configuration for validating html-files
		htmlhint: {
			options: {
				force: true,
				'attr-lowercase': true,
				'attr-value-double-quotes': true,
				'attr-value-not-empty': true,
				'doctype-first': true,
				'doctype-html5': true,
				'id-class-value': true,
				'id-unique': true,
				'img-alt-require': true,
				'spec-char-escape': true,
				'src-not-empty': true,
				'style-disabled': true,
				'tag-pair': true,
				'tag-self-close': true,
				'tagname-lowercase': true
			},
			all: {
				src: ['*/*.html']
			}
		},
		
		// Configuration for optimizing image-files
		imagemin: {
			options: {
				optimizationLevel: 7
			},
			dev: {
				files: [
					{
						cwd: 'source/img/',
						dest: 'build/img/',
						expand: true,
						src: ['**/*.{jpg,png}']
					}
				]
			},
			dist: {
				files: [
					{
						cwd: 'source/img/',
						dest: 'dist/img/',
						expand: true,
						src: ['**/*.{jpg,png}']
					}
				]
			}
		},
		
		// Configuration for validating js-files
		jshint: {
			options: {
				force: true,
				'asi': false,
				'bitwise': false,
				'boss': true,
				'curly': false,
				'eqeqeq': false,
				'eqnull': true,
				'evil': false,
				'forin': true,
				'immed': false,
				'laxbreak': true,
				'newcap': false,
				'noarg': true,
				'noempty': false,
				'nonew': false,
				'nomen': false,
				'onevar': false,
				'plusplus': false,
				'regexp': false,
				'undef': false,
				'sub': true,
				'strict': false,
				'white': false,
				'indent': 4,
				'maxerr': 50,
				'jquery': true,
				'browser': true
			},
			own: {
				options: {
					'-W015': true
				},
				src: [
					'source/js/modules/**/*.js',
					'source/js/init/*.js'
				]
			},
			all: {
				options: {
					'-W015': true, '-W089':true
				},
				src: [
					'source/js/**/*.js',
					'!source/js/shims/**/*.js',
					'!source/js/polyfiller.js',
					'!source/js/libs/*',
					'!source/js/__*.js'
				]
			}
		},
		
		// Configuration for packager
		packager: {
			all: {
				options: {
					config: 'source/js/project.jspackcfg',
					cwd: 'source/js/',
					dest: 'source/js/',
					src: ['**/*']
				}
			}
		},
		
		// Configuration for measuring frontend performance
		phantomas: {
			all : {
				options : {
					indexPath: 'build/phantomas/',
					numberOfRuns: 10,
					url: 'http://0.0.0.0:9002/'
				}
			}
		},
		
		// Configuration for photobox
		photobox: {
			all: {
				options: {
					indexPath: 'build/photobox/',
					screenSizes: [ '320', '568', '768', '1024', '1280' ],
					urls: [ 'http://0.0.0.0:9002/index.html' ]
				}
			}
		},
		
		// Configuration for prettifying the html-code generated by assemble
		prettify: {
			options: {
				condense: false,
				indent: 1,
				indent_char: '	',
				indent_inner_html: false,
				preserve_newlines: true,
				unformatted: [
					"a",
					"code",
					"pre"
				]
			},
			dev: {
				options: {
					brace_style: 'expand'
				},
				files: [
					{
						cwd: 'build/',
						dest: 'build/',
						expand: true,
						ext: '.html',
						src: ['*.html']
					}
				]
			},
			dist: {
				options: {
					brace_style: 'collapse'
				},
				files: [
					{
						cwd: 'dist/',
						dest: 'dist/',
						expand: true,
						ext: '.html',
						src: ['*.html']
					}
				]
			}
		},
		
		// Configuration for string-replacing the grunticon output
		'string-replace': {
			datasvg: {
				files: {
					'source/sass/icons/_icons-data-svg.scss': 'source/sass/grunticon/_icons-data-svg.scss'
				},
				options: {
					replacements: [{
						pattern: /%icon-/g,
						replacement: '%icon-data-svg-'
					}]
				}
			},
			datapng: {
				files: {
					'source/sass/icons/_icons-data-png.scss': 'source/sass/grunticon/_icons-data-png.scss'
				},
				options: {
					replacements: [{
						pattern: /%icon-/g,
						replacement: '%icon-data-png-'
					}]
				}
			},
			fallback: {
				files: {
					'source/sass/icons/_icons-fallback.scss': 'source/sass/grunticon/_icons-fallback.scss'
				},
				options: {
					replacements: [{
						pattern: /%icon-/g,
						replacement: '%icon-fallback-'
					}]
				}
			}
		},
		
		// Configuration for the styleguide output
		styleguide: {
			options: {
				template: {
					src: 'source/styleguide-template/'
				},
				name: 'Style Guide',
				framework: {
					name: 'kss'
				}
			},
			all: {
				files: [
					{
						'dist/styleguide': 'source/sass/blocks/**/*.scss'
					}
				]
			}
		},
		
		// Configuration for optimizing SVG-files
		svgmin: {
			options: {
				 plugins: [
					{ cleanupAttrs: true },
					{ cleanupEnableBackground: true },
					{ cleanupIDs: true },
					{ cleanupNumericValues: true },
					{ collapseGroups: true },
					{ convertColors: true },
					{ convertPathData: true },
					{ convertShapeToPath: true },
					{ convertStyleToAttrs: true },
					{ convertTransform: true },
					{ mergePaths: true },
					{ moveElemsAttrsToGroup: true },
					{ moveGroupAttrsToElems: true },
					{ removeComments: true },
					{ removeDoctype: true },
					{ removeEditorsNSData: true },
					{ removeEmptyAttrs: true },
					{ removeEmptyContainers: true },
					{ removeEmptyText: true },
					{ removeHiddenElems: true },
					{ removeMetadata: true },
					{ removeNonInheritableGroupAttrs: true },
					{ removeRasterImages: true },
					{ removeTitle: true },
					{ removeUnknownsAndDefaults: true },
					{ removeUnusedNS: true },
					{ removeUselessStrokeAndFill: false }, // Enabling this may cause small details to be removed
					{ removeViewBox: false }, // Keep the viewBox because that's where illustrator hides the SVG dimensions
					{ removeXMLProcInst: false }, // Enabling this breaks grunticon because it removes the XML header
					{ sortAttrs: true },
					{ transformsWithOnePath: false } // Enabling this breaks Illustrator SVGs with complex text
				]
			},
			all: {
				files: [
					{
						cwd: 'source/img/icons',
						dest: 'source/img/icons/svgmin',
						expand: true,
						ext: '.svg',
						src: ['*.svg']
					}
				]
			}
		},
		
		// Configuration for syncing files
		// Task does not remove any files and directories in 'dest' that are no longer in 'cwd'. :'(
		sync: {
			ajax: {
				files: [
					{
						cwd: 'source/ajax-content/',
						dest: 'build/ajax-content/',
						src: '**/*'
					}
				]
			},
			favicon: {
				files: [
					{
						cwd: 'source/img/',
						dest: 'build/img/',
						src: '**/*.ico'
					}
				]
			},
			fonts: {
				files: [
					{
						cwd: 'source/fonts/',
						dest: 'build/fonts/',
						src: '**/*'
					}
				]
			},
			js: {
				files: [
					{
						cwd: 'source/js/',
						dest: 'build/js/',
						src: '**/*'
					}
				]
			}
		},
		
		// Configuration for watching changes
		watch: {
			options: {
				livereload: 35730,
				spawn: false
			},
			css: {
				files: ['build/css/**/*.css']
			},
			scss: {
				files: ['source/sass/**/*.scss'],
				tasks: ['compass:dev', 'autoprefixer:dev'],
				options: {
					debounceDelay: 0,
					livereload: false,
					spawn: true
				}
			},
			icons: {
				files: ['source/img/icons/*.svg'],
				tasks: ['newer:svgmin', 'grunticon', 'string-replace']
			},
			images: {
				files: ['source/img/*', 'source/img/**/*.{jpg,png}', '!source/img/dev/*'],
				tasks: ['newer:imagemin:dev']
			},
			sync_ajax: {
				files: ['source/ajax-content/**/*'],
				tasks: ['sync:ajax']
			},
			sync_fonts: {
				files: ['source/fonts/**/*'],
				tasks: ['sync:fonts']
			},
			sync_js: {
				files: ['source/js/**/*'],
				tasks: ['sync:js'],
				options: {
					spawn: true
				}
			},
			templates: {
				files: ['source/assemble/**/*.{json,hbs}'],
				tasks: ['newer:assemble:dev', 'prettify:dev', 'htmlhint']
			}
		}
	});
	
	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-packager');
	grunt.loadNpmTasks('grunt-phantomas');
	grunt.loadNpmTasks('grunt-photobox');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-sync');
	
	// Where we tell Grunt what to do when we type "grunt" into the terminal.
	
	// Default -> Standard Build task
	grunt.registerTask('default', [
		'build'
	]);
	
	// Build task
	grunt.registerTask('build', [
		'clean:dev',
		'newer:svgmin',
		'grunticon',
		'string-replace',
		'newer:imagemin:dev',
		'compass:dev',
		'autoprefixer:dev',
		'packager',
		'sync',
		'newer:assemble:dev',
		'prettify:dev',
		'htmlhint',
		'jshint',
		'connect:livereload',
		'watch'
	]);
	
	// Distributing task
	grunt.registerTask('dist', [
		'clean:dist',
		'svgmin',
		'grunticon',
		'string-replace',
		'imagemin:dist',
		'compass:dist',
		'autoprefixer:dist',
		'cmq',
		'cssmin',
		'packager',
		'copy:ajax',
		'copy:fonts',
		'copy:js',
		'assemble:dist',
		'prettify:dist',
		'htmlhint',
		'jshint',
		'styleguide',
		'copy:styleguide'
	]);
	
	// HTMLHint task
	grunt.registerTask('check-html', [
		'htmlhint'
	]);
	
	// JSHint task
	grunt.registerTask('check-js', [
		'jshint'
	]);
	
	// Phantomas task
	grunt.registerTask('measure-performance', [
		'connect:livereload',
		'phantomas'
	]);
	
	// Photobox task
	grunt.registerTask('take-screenshots', [
		'connect:livereload',
		'photobox'
	]);
	
	// Styleguide task
	grunt.registerTask('build-styleguide', [
		'styleguide',
		'copy:styleguide'
	]);
	
};
