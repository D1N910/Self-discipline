## 语言模板
通过这个模板规定所有显示的文本内容，页面最终应该没有任何字面文本。所有内容通过i18N内容进行显示，确保全球化支持多语言多环境。

## 文件目录
root
> weekNames.js      通过i18n显示星期相关的文本
> zh                简体中文
>> pages            各页面替换文本
>> index.js         app.js等非页面类文本
>> version.js       版本信息
>> wordList.js      常用闲散字串