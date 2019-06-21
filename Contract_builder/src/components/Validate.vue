<script>
export default {
    data () {},
    methods: {
        validateURL () {
        // debugger
        let spreadsheetId = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(this.parseURL)
        // console.log('spreadSheetID', spreadsheetId)
        if ((spreadsheetId !== null) && (spreadsheetId !== undefined)) {
          spreadsheetId = spreadsheetId[1]
        } else {
          return
        }
        let sheetId = new RegExp('[#&]gid=([0-9]+)').exec(this.parseURL)
        // console.log('sheetId', sheetId)
        if (sheetId) {
          sheetId = sheetId[1]
        } else {
          sheetId = '0'
        }
        // if valid
        this.parseDataFromURL(spreadsheetId, sheetId)
      },
      parseDataFromURL (spreadsheetId, sheetId) {
        this.processing = true
        let $this = this
        let url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=xlsx&gid=' + sheetId
        // console.log(url)

        let xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.overrideMimeType('text/plain; charset=x-user-defined')
        xhr.onload = function (e) {
          // debugger
          let data = xhr.responseText
          // console.log('xmlData', data)
          let f = new File([], 'sample.xlsx', {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
          let reader = new FileReader()
          reader.onload = function (e) {
            $this.parseSpreadsheetData(e, data)
          }
          reader.readAsBinaryString(f)
        }
        xhr.send(null)
      },
      parseSpreadsheetData (e, data) {
        this.processing = true
        // debugger
        let finalJsonObj = {}
        let workbook = _XLSX.read(data, {type: 'binary'})
        // console.log('workbook', workbook)
        let sheetName = workbook.SheetNames[0]
        this.updateContractName(workbook.SheetNames[0])
        let jsonObject = workbook.Sheets[sheetName]
        let len = Object.keys(jsonObject).length
        let cloneObj = JSON.parse(JSON.stringify(jsonObject))
        console.log('cloneObj', cloneObj)
        // debugger
        // dirty code to get the rich text values
        for (let i = 0; i < len; i++) {
          let objKey = Object.keys(jsonObject)[i]
          if (objKey !== '!ref') {
            let tmp = jsonObject[objKey].h
            if (!tmp) {
              tmp = jsonObject[objKey].w
            }
            cloneObj[objKey].w = tmp
          }
        }
        finalJsonObj = _XLSX.utils.sheet_to_row_object_array(cloneObj)
        console.log('finalJsonObj', finalJsonObj)
        // debugger
        // console.log(finalJsonObj)
        this.contractObjParser(finalJsonObj)
        this.$router.push({name: 'ContractBuilder', params: { items: self.items }})
      },
    }
}
</script>
