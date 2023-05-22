import React from 'react'
import SubmitButtons from './SubmitButtons'
import Header from './Header';

export default class PlaygroundIndex extends React.Component<any, { value: string }> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  async handleSubmit(event: any) {
    event.preventDefault()

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
            "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "role": "user",
        "content": this.state.value
      })
    })
    console.log(response)
    const content = JSON.parse(await response.json())
    console.log(content)
    this.setState({value: this.state.value + "\n\nchatGPT: " + content.choices[0].message.content + "\n\n"})
  }

  render() {
    return (
      <div>
        <Header />
        <div className='m-4'>
          <form onSubmit={this.handleSubmit} className='mt-2 h-screen flex flex-col gap-2 grow basis-auto'>
            <textarea onChange={this.handleChange} value={this.state.value} className='border-2 w-full h-[calc(100%-150px)] p-2 overflow-y-auto focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md'/>
            <SubmitButtons />
          </form>
        </div>
      </div>
    )
  }
}
