"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['shui-yin-zhao-pian-gai-lark-base.replit.app']);
block_basekit_server_api_1.basekit.addField({
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
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'date',
            label: t('label.fieldSelect.date'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'text',
            label: t('label.input'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            }
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Attachment,
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const fileUrls = [];
        try {
            let { files, date, text } = formItemParams;
            for (let i = 0; i < files.length; i++) {
                const url = files[i].tmp_url;
                let api = `https://shui-yin-zhao-pian-gai-lark-base.replit.app/addWatermark?url=${url}&time=${new Date(date).getTime() + 1000 * 60 * 60 * 8}&text=${text[0].text}`;
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                if (!data || !data['suc'])
                    continue;
                const fileName = data['fileName'];
                fileUrls.push({
                    content: `https://shui-yin-zhao-pian-gai-lark-base.replit.app/out/${fileName}`,
                    name: fileName,
                    contentType: 'attachment/url',
                });
            }
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: fileUrls
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: block_basekit_server_api_1.FieldCode.Error
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsNkNBQTZDLENBQUMsQ0FBQyxDQUFDO0FBRXZFLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCx5QkFBeUIsRUFBRSxhQUFhO2dCQUN4Qyx3QkFBd0IsRUFBRSxXQUFXO2dCQUNyQyxhQUFhLEVBQUUsWUFBWTtnQkFDM0IseUJBQXlCLEVBQUUsVUFBVTthQUN0QztZQUNELE9BQU8sRUFBRTtnQkFDUCx5QkFBeUIsRUFBRSwrREFBK0Q7Z0JBQzFGLHdCQUF3QixFQUFFLG1EQUFtRDtnQkFDN0UsYUFBYSxFQUFFLGlDQUFpQztnQkFDaEQseUJBQXlCLEVBQUUsaURBQWlEO2FBQzdFO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLHdCQUF3QjtnQkFDbkQsd0JBQXdCLEVBQUUsa0JBQWtCO2dCQUM1QyxhQUFhLEVBQUUsc0JBQXNCO2dCQUNyQyx5QkFBeUIsRUFBRSxhQUFhO2FBQ3pDO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxPQUFPO1lBQ1osS0FBSyxFQUFFLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztZQUNuQyxTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNwQztZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUUsSUFBSTthQUNmO1NBQ0Y7UUFDRDtZ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