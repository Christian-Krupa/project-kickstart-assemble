module.exports = function(grunt) {
	
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
						src: ['*.hbs']
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
						src: ['*.hbs']
					}
				]
			}
		},
		
		// Configuration for autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8', 'ie 9'],
				map: true
			},
			dev: {
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
						src: ['build/**/*', '!build/.svn/**', '!build/**/.svn/**']
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
			},
			images: {
				files: [
					{
						filter: 'isFile',
						src: ['build/img/**/*.{jpg,png}', '!build/img/icons/**']
					}
				]
			}
		},
		
		// Configuration for compass
		compass: {
			options: {
				raw: [
					'# Require any additional compass plugins here.',
					'require "sass-globbing"',
					'',
					'# Set this to the root of your project when deployed:',
					'http_path = "/"',
					'css_dir = "build/css"',
					'javascripts_dir = "build/js"',
					'sass_dir = "source/sass"',
					'images_dir = "source/img"',
					'',
					'# You can select your preferred output style here (can be overridden via the command line):',
					'# output_style = :expanded or :nested or :compact or :compressed',
					'',
					'# To enable relative paths to assets via compass helper functions. Uncomment:',
					'# relative_assets = true',
					'',
					'# To disable debugging comments that display the original location of your selectors. Uncomment:',
					'line_comments = true',
					'Sass::Script::Number.precision = 8',
					'',
					'# If you prefer the indented syntax, you might want to regenerate this',
					'# project again passing --syntax sass, or you can uncomment this:',
					'# preferred_syntax = :sass',
					'# and then run:',
					'# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass',
					'',
					'# Sass Options',
					'sass_options = {',
					'  :debug_info => false,',
					'  :read_cache => true,',
					'  :sourcemap => true', // this set to 'true' has no effect, if you aren't using sass >= 3.3
					'}'
				].join("\n")
			},
			dev: {
				options: {
					environment: 'development',
					outputStyle: 'expanded',
					sourcemap: true // this set to 'true' has no effect, if you aren't using sass >= 3.3
				}
			},
			dist: {
				options: {
					cssDir: 'dist/css',
					environment: 'production',
					force: true,
					outputStyle: 'compressed'
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
			styleguide: {
				dest: 'dist/styleguide/css/',
				expand: true,
				filter: 'isFile',
				flatten: true,
				src: ['build/css/**/*.css']
			}
		},
		
		// Configuration for managing SVG-icons
		grunticon: {
			options: {
				cssprefix: '%icon-',
				datapngcss: 'icons.data.png.scss',
				datasvgcss: 'icons.data.svg.scss',
				urlpngcss: 'icons.fallback.scss'
			},
			dev: {
				files: [
					{
						cwd: 'build/img/icons/svgmin',
						dest: 'build/img/icons',
						expand: true,
						src: ['*.svg']
					}
				]
			},
			dist: {
				files: [
					{
						cwd: 'dist/img/icons/svgmin',
						dest: 'dist/img/icons',
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
			default: {
				options: {
					config: 'source/js/project.jspackcfg',
					cwd: 'source/js/'
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
					name: 'kss',
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
			dev: {
				files: [
					{
						cwd: 'source/img/icons',
						dest: 'build/img/icons/svgmin',
						expand: true,
						ext: '.svg',
						src: ['**/*.svg']
					}
				]
			},
			dist: {
				files: [
					{
						cwd: 'source/img/icons',
						dest: 'dist/img/icons/svgmin',
						expand: true,
						ext: '.svg',
						src: ['**/*.svg']
					}
				]
			}
		},
		
		// Configuration for syncing files
		// Task does not remove any files and directories in 'dest' that are no longer in 'src'. :'(
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
			images: {
				files: ['source/img/*', 'source/img/**/*.{jpg,png}', '!source/img/dev/*'],
				tasks: ['clean:images', 'imagemin:dev']
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
				tasks: ['sync:js']
			},
			templates: {
				files: ['source/assemble/**/*.{json,hbs}'],
				tasks: ['assemble:dev', 'htmlhint']
			}
		}
	});
	
	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-packager');
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
		'compass:dev',
		'autoprefixer:dev',
		'packager',
		'svgmin:dev',
		'grunticon:dev',
		'imagemin:dev',
		'sync',
		'newer:assemble:dev',
		'htmlhint',
		'jshint',
		'connect:livereload',
		'watch'
	]);
	
	// Distributing task
	grunt.registerTask('dist', [
		'clean:dist',
		'compass:dist',
		'autoprefixer:dist',
		'packager',
		'svgmin:dist',
		'grunticon:dist',
		'imagemin:dist',
		'sync',
		'assemble:dist',
		'htmlhint',
		'jshint',
		'styleguide',
		'copy'
	]);
	
	// HTMLHint task
	grunt.registerTask('check-html', [
		'htmlhint'
	]);
	
	// JSHint task
	grunt.registerTask('check-js', [
		'jshint'
	]);
	
	// Styleguide task
	grunt.registerTask('build-styleguide', [
		'styleguide',
		'copy'
	]);
	
};