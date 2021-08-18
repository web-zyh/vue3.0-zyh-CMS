import T from 'ant-design-vue/es/table/Table'
import lodash from 'lodash'
import './index.less'

export default {
  name: 'STable',
  data() {
    return {
      needTotalList: [],
      selectedRows: [],
      selectedRowKeys: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination),
      tscroll: {}
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    request: {
      type: Function
    },
    datas: {
      type: Array
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },

    showSizeChanger: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    rowSelection: {
      type: Object,
      default: null
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    },
    /**
     * enable page URI mode
     *
     * e.g:
     * /users/1
     * /users/2
     * /users/3?queryParam=test
     * ...
     */
    pageURI: {
      type: Boolean,
      default: false
    },
    autoLoad: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    },
    pageDataCfg: {
      type: Object,
      default: () => {
        return {
          pageSizeName: 'size',
          currentName: 'current',
          totalName: 'total',
          recordsName: 'records'
        }
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          showLessItems: true,
          showQuickJumper: true,
          showTotal: (total, range) => ` 第${range[0]}-${range[1]} 条，总计 ${total} 条`,
        }
      }
    }
  }),
  watch: {
    'localPagination.current'(val) {
      this.pageURI && this.$router.push({
        ...this.$route,
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, {
          pageNo: val
        })
      })
      this.$emit("update:pagination", this.localPagination)
    },
    datas(val) {
      this.clearSelected()
      if (val && val.length > 0) {
        if (this.tscroll && this.tscroll._y) {
          this.tscroll.y = this.tscroll._y
        }
      } else {
        delete this.tscroll.y
      }
      this.localDataSource = val
    },
    localDataSource(val){
      if (val && val.length > 0) {
        if (this.tscroll && this.tscroll._y) {
          this.tscroll.y = this.tscroll._y
        }
      } else {
        delete this.tscroll.y
      }
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  created() {
    const {pageNo} = this.$route.params
    const localPageNum = this.pageURI && (pageNo && parseInt(pageNo)) || this.pageNum
    this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
      current: localPageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger,
      showLessItems: true,
      showQuickJumper: true,
      showTotal: (total, range) => ` 第${range[0]}-${range[1]} 条，总计 ${total} 条`,
    }) || false
    // console.log('this.localPagination', this.localPagination)
    this.needTotalList = this.initTotalList(this.columns)
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 空, 则强制刷新到第一页
     * @param number page
     */
    loadPage(page = 1) {
      this.clearSelected()
      this.localPagination = Object.assign({}, {
        current: page, pageSize: this.pageSize
      })
      this._loadPage()
    },
    loadData() {
      this.clearSelected()
      this.localLoading = true
      const result = this.request({})
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          if (r) {
            if (lodash.isArray(r)) {
              this.localDataSource = r
            } else {
              this.localDataSource = r[this.pageDataCfg.recordsName] // 返回结果中的数组数据
            }

          } else {
            this.localDataSource = [] // 返回结果中的数组数据
          }

          this.localLoading = false
        })
      } else {
        this.localLoading = false
      }
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    _loadPage(pagination, filters, sorter) {
      this.localLoading = true
      let pageCfg = {};
      pageCfg[this.pageDataCfg.currentName] = (pagination && pagination.current) ||
        this.showPagination && this.localPagination.current || this.pageNum
      pageCfg[this.pageDataCfg.pageSizeName] = (pagination && pagination.pageSize) ||
        this.showPagination && this.localPagination.pageSize || this.pageSize
      const parameter = Object.assign(pageCfg,
        (sorter && sorter.field && {
          sortField: sorter.field
        }) || {},
        (sorter && sorter.order && {
          sortOrder: sorter.order
        }) || {}, {
          ...filters
        }
      )
      // console.log('parameter', parameter)
      const result = this.request(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            current: r[this.pageDataCfg.currentName], // 返回结果中的当前分页数
            total: parseInt(r[this.pageDataCfg.totalName]), // 返回结果中的总记录数
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) ||
              this.localPagination.pageSize
          }) || false
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r[this.pageDataCfg.recordsName].length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--
            this._loadPage()
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          try {
            if ((['auto', true].includes(this.showPagination) && r.totalCount <= (r.pageNo * this.localPagination.pageSize))) {
              this.localPagination.hideOnSinglePage = true
            }
          } catch (e) {
            this.localPagination = false
          }
          // console.log('_loadPage -> this.localPagination', this.localPagination)
          if (r) {
            this.localDataSource = r[this.pageDataCfg.recordsName] // 返回结果中的数组数据
          } else {
            this.localDataSource = []
          }

          this.localLoading = false
        })
      } else {
        this.localLoading = false
      }
    },
    initTotalList(columns) {
      const totalList = []
      columns && columns instanceof Array && columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({
            ...column,
            total: 0
          })
        }
      })
      return totalList
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
      const list = this.needTotalList
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(lodash.get(val, item.dataIndex))
            return isNaN(total) ? 0 : total
          }, 0)
        }
      })
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.rowSelection) {
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear(callback) {
      if (this.selectedRowKeys.length <= 0) return null
      return (
        <a style="margin-left: 24px" onClick={() => {
          callback()
          this.clearSelected()
        }}>清空</a>
      )
    },
    setScroll(x, y) {
      ////54    46   38     // 64    57   57
      let h = 0;
      if (this.showPagination) {
        let _size = this.size ? this.size : 'default'
        if (_size == 'default') {
          h = 54 + 60
        } else if (_size == 'middle') {
          h = 46 + 30
        } else if (_size == 'small') {
          h = 38 + 30
        }
      } else {
        let _size = this.size ? this.size : 'default'
        if (_size == 'default') {
          h = 54
        } else if (_size == 'middle') {
          h = 46
        } else if (_size == 'small') {
          h = 38
        }
      }
      let _scroll = {}
      if (x) {
        _scroll.x = x - 20
      }
      if (y) {
        _scroll._y = (y - h - 8) + 'px'
      }
      this.tscroll = _scroll
      let _localDataSource=this.localDataSource
      this.localDataSource = []
      this.localDataSource = _localDataSource
    }
  },
  mounted() {
    if (this.datas) {
      this.localDataSource = this.datas
    } else {
      if (this.autoLoad) {
        this._loadPage()
      }
    }

  },
  render() {
    const props = {}
    const localKeys = Object.keys(this.$data)
    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      if (k === 'scroll') {
        props[k] = Object.assign(this['scroll'] ? this['scroll'] : {}, this.tscroll ? this.tscroll : {})
        return props[k]
      } else if (k === 'rowSelection') {
        if (this.rowSelection) {
          props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows)
            }
          }
          return props[k]
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null
          return props[k]
        }
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    const table = (
      <a-table {...{props, scopedSlots: {...this.$scopedSlots}}} onChange={this._loadPage} class='inner-table'
               onExpand={(expanded, record) => {
                 this.$emit('expand', expanded, record)
               }}>
        {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
      </a-table>
    )

    return (
      <div class="table-wrapper">
        {table}
      </div>
    )
  }
}
