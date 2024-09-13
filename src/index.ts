import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType, DateFormatter } from '@lark-opdev/block-basekit-server-api';
const { t } = field;


// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['shui-yin-zhao-pian-gai-lark-base.replit.app']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        'label.fieldSelect.files': '请选择图片附件所在字段',
        'label.fieldSelect.date': '请选择时间所在字段',
        'label.input': '请输入水印自定义文字',
        'label.input.placeholder': '将显示在图片底部',
      },
      'en-US': {
        'label.fieldSelect.files': 'Please select the field where the image attachment is located',
        'label.fieldSelect.date': 'Please select the field where the time is located',
        'label.input': 'Enter the custom watermark text',
        'label.input.placeholder': 'It will be displayed at the bottom of the image',
      },
      'ja-JP': {
        'label.fieldSelect.files': '画像アプロードのフィールドを選択してください',
        'label.fieldSelect.date': '日付フィールドを選択してください',
        'label.input': '水印のカスタムテキストを入力してください',
        'label.input.placeholder': '画像の下に表示されます',
      },
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'files',
      label: t('label.fieldSelect.files'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'date',
      label: t('label.fieldSelect.date'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.DateTime],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'text',
      label: t('label.input'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: any, context) => {
    const fileUrls = []
    try {
      let { files, date, text } = formItemParams;
      for (let i = 0; i < files.length; i++) {
        const url = files[i].tmp_url
        let api = `https://shui-yin-zhao-pian-gai-lark-base.replit.app/addWatermark?url=${url}&time=${new Date(date).getTime() + 1000 * 60 * 60 * 8}&text=${text[0].text}`;
        const data = (await (await context.fetch(api, { method: 'GET' })).json());
        if (!data || !data['suc']) continue
        const fileName = data['fileName']
        fileUrls.push({
          content: `https://shui-yin-zhao-pian-gai-lark-base.replit.app/out/${fileName}`,
          name: fileName,
          contentType: 'attachment/url',
        })
      }      
      return {
        code: FieldCode.Success,
        data: fileUrls
      }
    } catch (error) {
      console.log(error);
      return {
        code: FieldCode.Error
      };
    }
  },
});
export default basekit;