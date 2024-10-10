import type { Module, Parchment as TypeParchment } from 'quill'
import type { IEditorConfig } from './config/types'
import Quill from 'quill'
import { FontStyle, LineHeightStyle, SizeStyle, TextIndentStyle } from './attributors' // 字符统计
import { getListValue, ICONS_CONFIG, inputFile, TABLE_RIGHT_MENU_CONFIG } from './config' // 粘贴板
import Counter from './counter' // 图片
import CustomClipboard from './custom-clipboard' // 图片拉伸模块
import CustomImage from './custom-image/BlotFormatter' // 上传
import { CustomImageSpec } from './custom-image/specs/CustomImageSpec' // 表情
import CustomUploader from './custom-uploader' // 文件
import Emoji from './emoji' // 超链接0
import FileModule from './file' // @提醒
import { FormatPainter } from './format-painter'// 截图
// import GlobalLink from './global-link' // 全局链接
import Link from './link' // 软回车
import Mention from './mention/Mention' // 删除线
// import QuickMenu from './quick-menu' // 快捷菜单
import { Screenshot } from './screenshot' // 表格
import SoftBreak from './soft-break' // 代码块高亮
import Strike from './strike' // 工具栏
import CustomSyntax from './syntax' // 视频
import BetterTable from './table/better-table'
import Toolbar from './toolbar'
import Video from './video'

class FluentEditor extends Quill {
  constructor(container: HTMLElement | string, options: IEditorConfig = {}) {
    super(container, options)
  }
}

const registerModules = function () {
  const Icons = Quill.import('ui/icons')
  const iconKeys = Object.keys(ICONS_CONFIG)
  iconKeys.forEach((iconKey) => {
    Icons[iconKey] = ICONS_CONFIG[iconKey]
  })

  // TODO: fix uploadOption type
  const SnowTheme = Quill.import('themes/snow') as any
  SnowTheme.DEFAULTS = {
    modules: {
      toolbar: {
        handlers: {
          ...(SnowTheme.DEFAULTS as Record<string, any>).modules.toolbar.handlers,
          undo() {
            this.quill.history.undo()
          },
          redo() {
            this.quill.history.redo()
          },
          file() {
            const accept = this.quill.options?.uploadOption?.fileAccept
            inputFile.call(this, 'file', accept)
          },
          image() {
            const accept = this.quill.options?.uploadOption?.imageAccept
            inputFile.call(this, 'image', accept)
          },
          emoji() {},
          fullscreen() {},
          [FormatPainter.toolName]: FormatPainter,
          [Screenshot.toolName]: Screenshot,
        },
      },
      [TableUp.moduleName]: {
        full: false,
        resizerSetOuter: true,
        selection: {
          selectColor: '#5170ff',
          tableMenu: {
            tipText: true,
            contextmenu: true,
            tipTexts: TABLE_RIGHT_MENU_TEXT_CONFIG,
            texts: TABLE_MENUE_TEXT_CONFIG,
          },
        },
        texts: TABLE_TEXT_CONFIG,
      },
      image: {
        specs: [CustomImageSpec],
        overlay: {
          style: {
            border: '1px dashed rgb(68, 68, 68)',
          },
        },
        align: {
          icons: {
            left: '<i class="icon-text-align-left"></i>',
            center: '<i class="icon-text-align-center"></i>',
            right: '<i class="icon-text-align-right"></i>',
          },
        },
      },
    },
  }

  FluentEditor.register(
    {
      'modules/toolbar': Toolbar,
      'modules/mention': Mention,
      [`modules/${TableUp.moduleName}`]: TableUp,
      'modules/clipboard': CustomClipboard,
      'modules/uploader': CustomUploader, // 三者关联性最强
      'modules/image': CustomImage, // 三者关联性最强
      'modules/file': FileModule, // 三者关联性最强
      'modules/counter': Counter,
      'modules/emoji-toolbar': Emoji.ToolbarEmoji,
      'modules/emoji-shortname': Emoji.ShortNameEmoji,
      // 'modules/global-link': GlobalLink,//暂未开发
      'modules/link': Link, // 报错
      // 'modules/quickmenu': QuickMenu,//暂未开发
      'modules/syntax': CustomSyntax,

      'formats/strike': Strike,
      'formats/softBreak': SoftBreak,
      'formats/video': Video,
      'formats/emoji': Emoji.EmojiBlot,
      'formats/font': FontStyle,
      'formats/size': SizeStyle,
      'formats/line-height': LineHeightStyle,
      'formats/text-indent': TextIndentStyle,
    },
    true, // 覆盖内部模块
  )

  return FluentEditor
}

export default registerModules()
