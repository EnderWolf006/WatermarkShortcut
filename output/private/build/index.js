"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
const domain = 'https://watermark-server.replit.app';
// const domain = 'http://localhost:3000';
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['localhost', 'watermark-server.replit.app']);
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
                'label.singleSelect.center': '居中大字',
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
                'label.singleSelect.center': 'Center big text',
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
                'label.singleSelect.center': '中央に大文字を表示',
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
                    {
                        label: t('label.singleSelect.center'),
                        value: 'center'
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
                let api = domain + `/addWatermark?url=${url}&time=${date ? new Date(date).getTime() + 1000 * 60 * 60 * 8 : '@NULL@'}&text=${encodeURIComponent(text[0].text || text[0][0].text)}&direction=${direction.value}&origin_name=${encodeURIComponent(files[i].name)}`;
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                console.log(`服务端返回：`, data);
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
            console.log("urls", fileUrls);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsTUFBTSxNQUFNLEdBQUcscUNBQXFDLENBQUM7QUFDckQsMENBQTBDO0FBRTFDLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsRUFBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7QUFFbkUsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLGFBQWE7Z0JBQ3hDLHdCQUF3QixFQUFFLFdBQVc7Z0JBQ3JDLGFBQWEsRUFBRSxZQUFZO2dCQUMzQix5QkFBeUIsRUFBRSxVQUFVO2dCQUNyQyw2QkFBNkIsRUFBRSxTQUFTO2dCQUN4QyxnQ0FBZ0MsRUFBRSxLQUFLO2dCQUN2Qyw0QkFBNEIsRUFBRSxJQUFJO2dCQUNsQywrQkFBK0IsRUFBRSxJQUFJO2dCQUNyQyw2QkFBNkIsRUFBRSxJQUFJO2dCQUNuQyxnQ0FBZ0MsRUFBRSxJQUFJO2dCQUN0QywwQkFBMEIsRUFBRSxNQUFNO2dCQUNsQywyQkFBMkIsRUFBRSxNQUFNO2FBRXBDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QixFQUFFLCtEQUErRDtnQkFDMUYsd0JBQXdCLEVBQUUsbURBQW1EO2dCQUM3RSxhQUFhLEVBQUUsaUNBQWlDO2dCQUNoRCx5QkFBeUIsRUFBRSxpREFBaUQ7Z0JBQzVFLDZCQUE2QixFQUFFLHNDQUFzQztnQkFDckUsZ0NBQWdDLEVBQUUsZUFBZTtnQkFDakQsNEJBQTRCLEVBQUUsVUFBVTtnQkFDeEMsK0JBQStCLEVBQUUsYUFBYTtnQkFDOUMsNkJBQTZCLEVBQUUsV0FBVztn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