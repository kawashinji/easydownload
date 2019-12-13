import axios from 'axios'

// example)
//   onclick="easyDownload.run('https://example.com/path/to/filename.pdf', 'pdf', 'filename')"
export const run = (
  requestUrl: string,
  fileExtension: string,
  filename: string
) => {
  axios({
    url: requestUrl,
    method: 'get',
    responseType: 'arraybuffer'
  })
    .then(response => {
      const blob = new Blob([response.data], {
        type: `application/${fileExtension}`
      })
      const URL = window.URL || window.webkitURL
      const downloadUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')

      if (window.navigator.msSaveBlob) {
        // IE11
        window.navigator.msSaveBlob(blob, `${filename}.${fileExtension}`)
      } else if (typeof link.download === 'undefined') {
        // iPhone
        window.location.href = downloadUrl
      } else {
        link.href = downloadUrl
        link.download = `${new Date().getTime()}.${fileExtension}`
        document.body.appendChild(link)
        link.click()
      }
    })
    .catch(error => {
      console.error(
        `http status=${error.response.status}, body=${error.response.data}`
      )
    })
}
