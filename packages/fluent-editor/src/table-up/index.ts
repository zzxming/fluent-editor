import TableUp, { updateTableConstants } from 'quill-table-up'

updateTableConstants({
  blotName: {
    tableWrapper: 'better-table',
  },
})

class TableUpOverride extends TableUp {
  static moduleName = 'better-table'
}

export default TableUpOverride
