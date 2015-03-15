module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					sourceMap: true
				},
				files: {
					'public/style/style.css': 'public/style/style.scss'
				}
			}
		},
		watch: {
			style: {
				files: ['public/style/**/*.scss'],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass']);
};