"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
const domain = 'https://shui-yin-zhao-pian-gai-lark-base.replit.app';
// const domain = 'http://localhost:3000';
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['localhost']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'label.fieldSelect.files': '请选择图片附件所在字段',
                'label.fieldSelect.date': '请选择时间所在字段',
                'label.input': '请输入水印自定义文字',
                'label.input.placeholder': '将显示在图片底部',
                'label.fieldSelect.direction': '请选择水印位置',
                'label.singleSelect.placeholder': '请选择',
                'label.singleSelect.leftTop': '左上',
                'label.singleSelect.leftBottom': '左下',
                'label.singleSelect.rightTop': '右上',
                'label.singleSelect.rightBottom': '右下',
                'label.singleSelect.cover': '覆盖全图',
            },
            'en-US': {
                'label.fieldSelect.files': 'Please select the field where the image attachment is located',
                'label.fieldSelect.date': 'Please select the field where the time is located',
                'label.input': 'Enter the custom watermark text',
                'label.input.placeholder': 'It will be displayed at the bottom of the image',
                'label.fieldSelect.direction': 'Please select the watermark location',
                'label.singleSelect.placeholder': 'Please select',
                'label.singleSelect.leftTop': 'Left top',
                'label.singleSelect.leftBottom': 'Left bottom',
                'label.singleSelect.rightTop': 'Right top',
                'label.singleSelect.rightBottom': 'Right bottom',
                'label.singleSelect.cover': 'Cover the entire image',
            },
            'ja-JP': {
                'label.fieldSelect.files': '画像アプロードのフィールドを選択してください',
                'label.fieldSelect.date': '日付フィールドを選択してください',
                'label.input': '水印のカスタムテキストを入力してください',
                'label.input.placeholder': '画像の下に表示されます',
                'label.fieldSelect.direction': '水印の位置を選択してください',
                'label.singleSelect.placeholder': '選択してください',
                'label.singleSelect.leftTop': '左上',
                'label.singleSelect.leftBottom': '左下',
                'label.singleSelect.rightTop': '右上',
                'label.singleSelect.rightBottom': '右下',
                'label.singleSelect.cover': '全体を埋める',
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
        {
            key: 'date',
            label: t('label.fieldSelect.date'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'direction',
            label: t('label.fieldSelect.direction'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                placeholder: t('label.singleSelect.placeholder'),
                options: [
                    {
                        label: t('label.singleSelect.leftTop'),
                        value: 'leftTop'
                    },
                    {
                        label: t('label.singleSelect.leftBottom'),
                        value: 'leftBottom'
                    },
                    {
                        label: t('label.singleSelect.rightTop'),
                        value: 'rightTop'
                    },
                    {
                        label: t('label.singleSelect.rightBottom'),
                        value: 'rightBottom'
                    },
                    {
                        label: t('label.singleSelect.cover'),
                        value: 'cover'
                    },
                ],
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
            console.log(formItemParams);
            let { files, date, text, direction } = formItemParams;
            for (let i = 0; i < files.length; i++) {
                const url = files[i].tmp_url;
                let api = domain + `/addWatermark?url=${url}&time=${date ? new Date(date).getTime() + 1000 * 60 * 60 * 8 : '@NULL@'}&text=${text[0].text || text[0][0].text}&direction=${direction.value}`;
                console.log(JSON.stringify(text));
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                if (!data || !data['suc'])
                    continue;
                const { fileName, width, height } = data;
                const info = {
                    content: domain + `/out/${fileName}`,
                    name: fileName,
                    contentType: 'attachment/url',
                    width,
                    height
                };
                fileUrls.push(info);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsTUFBTSxNQUFNLEdBQUcscURBQXFELENBQUM7QUFDckUsMENBQTBDO0FBRTFDLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFFckMsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLGFBQWE7Z0JBQ3hDLHdCQUF3QixFQUFFLFdBQVc7Z0JBQ3JDLGFBQWEsRUFBRSxZQUFZO2dCQUMzQix5QkFBeUIsRUFBRSxVQUFVO2dCQUNyQyw2QkFBNkIsRUFBRSxTQUFTO2dCQUN4QyxnQ0FBZ0MsRUFBRSxLQUFLO2dCQUN2Qyw0QkFBNEIsRUFBRSxJQUFJO2dCQUNsQywrQkFBK0IsRUFBRSxJQUFJO2dCQUNyQyw2QkFBNkIsRUFBRSxJQUFJO2dCQUNuQyxnQ0FBZ0MsRUFBRSxJQUFJO2dCQUN0QywwQkFBMEIsRUFBRSxNQUFNO2FBRW5DO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLCtEQUErRDtnQkFDMUYsd0JBQXdCLEVBQUUsbURBQW1EO2dCQUM3RSxhQUFhLEVBQUUsaUNBQWlDO2dCQUNoRCx5QkFBeUIsRUFBRSxpREFBaUQ7Z0JBQzVFLDZCQUE2QixFQUFFLHNDQUFzQztnQkFDckUsZ0NBQWdDLEVBQUUsZUFBZTtnQkFDakQsNEJBQTRCLEVBQUUsVUFBVTtnQkFDeEMsK0JBQStCLEVBQUUsYUFBYTtnQkFDOUMsNkJBQTZCLEVBQUUsV0FBVztnQkFDMUMsZ0NBQWdDLEVBQUUsY0FBYztnQkFDaEQsMEJBQTBC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