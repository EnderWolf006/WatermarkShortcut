"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['*.baseopendev.com', 'localhost']);
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
                let api = `http://localhost:3000/addWatermark?url=${url}&time=${new Date(date).getTime()}&text=${text[0].text}`;
                const data = (await (await context.fetch(api, { method: 'GET' })).json());
                if (!data || !data['suc'])
                    continue;
                const fileName = data['fileName'];
                fileUrls.push({
                    content: `http://localhost:3000/out/${fileName}`,
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
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    weather: String(error)
                },
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBK0o7QUFFL0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFHcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUUxRCxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AseUJBQXlCLEVBQUUsYUFBYTtnQkFDeEMsd0JBQXdCLEVBQUUsV0FBVztnQkFDckMsYUFBYSxFQUFFLFlBQVk7Z0JBQzNCLHlCQUF5QixFQUFFLFVBQVU7YUFDdEM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AseUJBQXlCLEVBQUUsK0RBQStEO2dCQUMxRix3QkFBd0IsRUFBRSxtREFBbUQ7Z0JBQzdFLGFBQWEsRUFBRSxpQ0FBaUM7Z0JBQ2hELHlCQUF5QixFQUFFLGlEQUFpRDthQUM3RTtZQUNELE9BQU8sRUFBRTtnQkFDUCx5QkFBeUIsRUFBRSx3QkFBd0I7Z0JBQ25ELHdCQUF3QixFQUFFLGtCQUFrQjtnQkFDNUMsYUFBYSxFQUFFLHNCQUFzQjtnQkFDckMseUJBQXlCLEVBQUUsYUFBYTthQUN6QztTQUNGO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxHQUFHLEVBQUUsT0FBTztZQUNaLEtBQUssRUFBRSxDQUFDLENBQUMseUJBQXlCLENBQUM7WUFDbkMsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztZQUNyQyxLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxVQUFVLENBQUM7YUFDcEM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7YUFDZjtT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