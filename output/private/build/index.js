"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// const domain = 'https://watermark-server.replit.app';
const domain = 'https://watermark-server-2.replit.app';
// const domain = 'http://localhost:3000';
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['localhost', 'watermark-server.replit.app', 'watermark-server-2.replit.app']);
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
                'label.singleSelect.opacity': '不透明度',
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
                'label.singleSelect.opacity': 'Opacity',
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
                'label.singleSelect.opacity': '不透明度',
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
        {
            key: 'opacity',
            label: t('label.singleSelect.opacity'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                placeholder: t('label.singleSelect.opacity'),
                options: (() => {
                    let arr = [];
                    for (let i = 0; i <= 10; i++) {
                        arr.push({ label: `${i * 10}%`, value: i * 10 });
                    }
                    return arr;
                })(),
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
            let { files, date, text, direction, opacity } = formItemParams;
            for (let i = 0; i < files.length; i++) {
                const url = files[i].tmp_url;
                let api = domain + `/addWatermark?url=${url}&time=${date ? new Date(date).getTime() + 1000 * 60 * 60 * 8 : '@NULL@'}&text=${encodeURIComponent(text[0].text || text[0][0].text)}&direction=${direction.value}&origin_name=${encodeURIComponent(files[i].name)}&tenantKey=${context.tenantKey}`;
                if (opacity !== undefined && opacity !== null) {
                    api += `&opacity=${opacity.value}`;
                }
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                console.log(`服务端返回：`, data);
                if (!data || !data['suc'])
                    continue;
                const { imageURL, fileName, width, height } = data;
                const info = {
                    content: imageURL,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFDL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsd0RBQXdEO0FBQ3hELE1BQU0sTUFBTSxHQUFHLHVDQUF1QyxDQUFDO0FBQ3ZELDBDQUEwQztBQUUxQywyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUMsNkJBQTZCLEVBQUUsK0JBQStCLENBQUMsQ0FBQyxDQUFDO0FBRXBHLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCx5QkFBeUIsRUFBRSxhQUFhO2dCQUN4Qyx3QkFBd0IsRUFBRSxXQUFXO2dCQUNyQyxhQUFhLEVBQUUsWUFBWTtnQkFDM0IseUJBQXlCLEVBQUUsVUFBVTtnQkFDckMsNkJBQTZCLEVBQUUsU0FBUztnQkFDeEMsZ0NBQWdDLEVBQUUsS0FBSztnQkFDdkMsNEJBQTRCLEVBQUUsSUFBSTtnQkFDbEMsK0JBQStCLEVBQUUsSUFBSTtnQkFDckMsNkJBQTZCLEVBQUUsSUFBSTtnQkFDbkMsZ0NBQWdDLEVBQUUsSUFBSTtnQkFDdEMsMEJBQTBCLEVBQUUsTUFBTTtnQkFDbEMsMkJBQTJCLEVBQUUsTUFBTTtnQkFDbkMsNEJBQTRCLEVBQUUsTUFBTTthQUVyQztZQUNELE9BQU8sRUFBRTtnQkFDUCx5QkFBeUIsRUFBRSwrREFBK0Q7Z0JBQzFGLHdCQUF3QixFQUFFLG1EQUFtRDtnQkFDN0UsYUFBYSxFQUFFLGlDQUFpQztnQkFDaEQseUJBQXlCLEVBQUUsaURBQWlEO2dCQUM1RSw2QkFBNkIsRUFBRSxzQ0FBc0M7Z0JBQ3JFLGdDQUFnQyxFQUFFLGVBQWU7Z0JBQ2pELDRCQUE0QixFQUFFLFVBQVU7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