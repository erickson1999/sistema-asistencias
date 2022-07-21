let axios = require('axios')
const testFunction = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/users', {
      headers: {
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDA0MDc0M2E1YjVmZjgyYjc4N2Q4YiIsImlhdCI6MTY1ODAyODQzNSwiZXhwIjoxNjU4MTE0ODM1fQ.5RUbwm3gyrCLKlcgXa9N0nbfMcgqhmaD3rybaQglnUc'
      }
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

testFunction()
