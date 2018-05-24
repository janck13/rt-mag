目标：开箱即用的一套bootstrap UI管理后台，自带成熟的操作权限管理，让开发专注于后台业务功能开发<br>
<br>
架构：spring boot2 + spring security + mybatis + mybatis plus<br>
 UI : bootstrap + custom jquery plugin<br>
<br>
操作权限，细粒度到操作按钮、controller的action<br>
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/domain.png)
<br>
UI 基于 bootstrap charisma http://usman.it/themes/charisma/index.html<br>
<br>
兼容性IE8+<br>
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/login.png)
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/index.png)
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/selop.png)
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/selaction.png)
<br>
自定义jquery控件<br>
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/kj.png)
<br>
数据结构<br>
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/datastructure1.png)
![image](https://raw.githubusercontent.com/roytian1217/rt-mag/master/rt-mag/src/main/webapp/resource/images/readme/datastructure3.png)
<br>
执行步骤：<br>
1.执行数据库脚本：/rt_um.sql（um即 unite management 统一管理的意思，在我们这里就是操作权限库）<br>
2.修改rt-mag下 application-dev.properties 中的um数据库链接 um.jdbc，其中web.jdbc是预留给业务库的数据库链接，我们这里非必须<br>
3.打包、java -jar 运行<br>
<br>
联系方式：QQ 373119611 857258318
