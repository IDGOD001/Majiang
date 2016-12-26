/**
 * 战绩返回
 */
class S19
{
    public parseData(obj:any)
    {

        if(!obj.data || obj.data.length <= 0)
        {
            EffectUtils.showTips("暂无战绩,快去邀请小伙伴一起玩吧！", 5);
            return;
        }

        var dialog:RecordDialog = StackManager.findDialog(RecordDialog, "RecordDialog");

        if(dialog)
        {
            dialog.show();

            dialog.obj = obj.data;
            
            dialog.refreshList();
        }
    }
}