import { Readable } from "node:stream";


class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {  
    // enviando o contador (setTimeout) para a porta
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})

//precisa ligar o servidor para poder ativar esse, ou seja:
//no stream-http-server.js ---> node stream/stream-http-server.js
// só então, pelo terminal do fake-to-http-stream.js ---> node stream/fake-to-http-stream.js