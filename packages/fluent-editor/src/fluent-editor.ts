import type { IEditorConfig } from './config/types'
import Quill from 'quill'
import { FontStyle, LineHeightStyle, SizeStyle, TextIndentStyle } from './attributors'
import { ICONS_CONFIG, inputFile, TABLE_MENUE_TEXT_CONFIG, TABLE_RIGHT_MENU_TEXT_CONFIG, TABLE_TEXT_CONFIG } from './config'
import Counter from './counter' // 字符统计
import CustomClipboard from './custom-clipboard' // 粘贴板
import CustomImage from './custom-image/BlotFormatter' // 图片
import { CustomImageSpec } from './custom-image/specs/CustomImageSpec' // 图片拉伸模块
import CustomUploader from './custom-uploader' // 上传
import Emoji from './emoji' // 表情
import FileModule from './file' // 文件
import { FormatPainter } from './format-painter'
import Link from './link' // 超链接0
import Mention from './mention/Mention' // @提醒
import { Screenshot } from './screenshot'// 截图
import SoftBreak from './soft-break' // 软回车
import Strike from './strike' // 删除线
import CustomSyntax from './syntax' // 代码块高亮
import { TableUp, updateTableConstants } from './table-up'
import Toolbar from './toolbar' // 工具栏
import Video from './video' // 视频
// import GlobalLink from './global-link' // 全局链接
// import QuickMenu from './quick-menu' // 快捷菜单

updateTableConstants({
  blotName: {
    tableWrapper: 'better-table',
  },
})
TableUp.moduleName = 'better-table'

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
