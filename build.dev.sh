
#project目录
PROJECT_ROOT=$PWD

#输出目录
outputdir=$PROJECT_ROOT/output

echo $outputdir

# 清除原有output目录下的内容
rm -rf $outputdir

fis3 release publish -cd $outputdir --no-color

cd $outputdir

mv ./index.html ./static/dumall/index.html

rm -rf app mock node_modules static/lib static/styles

# 为了兼容公有云，cp 一份静态资源 待移除
mkdir webroot
cp -r static ./webroot

tar -czvf $outputdir/dumall.tar.gz ./

cd $outputdir
rm -rf $outputdir/static $outputdir/webroot