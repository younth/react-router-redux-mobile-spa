
#project目录
PROJECT_ROOT=$PWD

#模块名称
modulename=`basename $PWD`

#输出目录
outputdir=$PROJECT_ROOT/output

#模块目录
moduledir=$PROJECT_ROOT/output/static/$modulename

echo $moduledir

# 清除原有output目录下的内容
rm -rf $outputdir

# fis3 --version --no-color
# fis3 release publish -cd $moduledir --no-color
fis3 release publish -cd output --no-color

# cd $moduledir
cd $outputdir

mv ./index.html ./static/dumall/index.html

rm -rf app mock node_modules static/lib static/styles

tar -czvf $outputdir/static.tar.gz ./

cd $outputdir
rm -rf $outputdir/static
