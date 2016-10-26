'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {    //文件合并任务
            one: {   //目标一
                options: {
                    banner: "/*这是合并后的js文件*/"
                },
                src: ["js/base.js", "js/test.js"],
                dest:"dest/js/concats.js"
            },
            two: {    //目标二
                options: {
                    banner: "/*这是css文件合并*/"
                },
                src: ["css/index.css", "css/other.css"],
                dest:"dest/css/concats.css"
            }
        },
        qunit: {
            files:["test.html"]
        },
        uglify: {  //js压缩任务
            one: {
                options: {
                    banner: "/*这是js压缩后的文件*/"
                },
                src: ["dest/js/concats.js"],
                dest:"uglify/js/uglifys.js"
            }
        },
        jshint: {   //文件检测插件
            one: {
                src: ["js/base.js", "js/test.js"]
            },
            two: {
                src: ["css/index.css", "css/other.css"]
            }
        },
        cssmin: {   //css文件压缩
            one: {
                //简洁文件格式
                /*src: ["css/index.css"],
                dest: "uglify/css/index.min.css"*/


                //对象文件格式
                /*files: {
                    "uglify/css/index.min.css": ["css/index.css"]
                }*/


                //数组文件格式
                files: [
                    {
                        src: ["css/index.css"],
                        dest: "css/index.min.css"
                    }
                ]
            },
            two: {
                src: ["css/list.css"],
                dest: "css/list.min.css"
            },
            three: {
                src: ["css/other.css"],
                dest: "css/other.min.css"
            }
        },
        watch: {
            one: {
                files: ["css/index.css"],
                tasks: ["cssmin:one"]
                
            },
            two: {
                files: ["css/list.css"],
                tasks: ["cssmin:two"]
            },
            three: {
                files: ["css/other.css"],
                tasks: ["cssmin:three"]
            },
            four: {
                files: ["js/base.js", "js/test.js"],
                tasks: ["concat:one","uglify"]
            }
        },
        
        log:{
            foos: [1, 2, 3],
            bar: "hello world",
            baz:false
        },

        //用于任务配置模板的任意属性
        foo: "abc",
        baz: ["hello world"],
        bar: [1, 2, 3]
    });

    //加载任务插件
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-qunit");

    //执行任务
    grunt.registerTask("one", "这是index样式表的压缩任务！", ["watch:one"]);
    grunt.registerTask("two", "这是list样式表的压缩任务！", ["watch:two"]);
    grunt.registerTask("three", "这是other样式表的压缩任务！", ["watch:three"]);
    grunt.registerTask("four", "这是js文件变化时的压缩任务！", ["watch:four"]);
    grunt.registerTask("five", "这是默认执行的任务！", ["qunit"]);
    grunt.registerTask("default", "这是默认执行的任务！", ["watch"]);

    //多任务执行
    //grunt.registerMultiTask("logs", "这是一个任务多个目标", function () {
    //    grunt.log.writeln(this.target + ":" + this.data);
    //});

    //自定义任务，任务内在执行其他任务
    /*grunt.registerMultiTask("log", "描述", function () {  
        grunt.log.writeln(this.target + ":" + this.data); //打印log任务的属性内容
        grunt.task.run(["cssmin"]); //任务内在执行任务
    });*/

    //任务异步执行
    /*grunt.registerTask("log", "描述", function () {
        var done = this.async();  //声明为异步执行，默认是同步执行的
        setTimeout(function () {
            grunt.log.writeln(this.target + ":" + this.data); //打印log任务的属性内容
            grunt.task.run(["cssmin"]); //任务内在执行任务
            done();
        }, 1000);
    });*/

    //访问自身名称
    grunt.registerTask("log", "这里是描述", function () {
        grunt.log.writeln(this.name);
    });
}