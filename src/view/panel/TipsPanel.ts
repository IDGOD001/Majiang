class TipsPanel extends BasePanel {

    private lab_description: eui.Label;

    public constructor() {
        super();
        this.skinName = "TipsPanelSkin";
    }

    childrenCreated() {
        super.childrenCreated();

        this.bgView.setType(BgViewType.curtain);
        this.bgView.setTitle("msg_title");

        this.lab_description.text = "" +
            "代理加盟咨询   【微信号】lyqp110\n" +
            "房卡问题咨询   【公众号】CCTV1V5\n" +
            "投诉建议举报   【公众号】CCTV1V5";
    }
}