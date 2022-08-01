import Panzoom, { PanzoomObject } from '../../src/panzoom'
import React, { useEffect, useRef } from 'react'

import Code from '../Code'
import Demo from '../Demo'

const code = <Code>{`Panzoom(elem, { contain: true })`}</Code>

export default function ContainTrue() {
  const elem = useRef<HTMLDivElement>(null)
  let panzoom: PanzoomObject
  useEffect(() => {
    panzoom = Panzoom(elem.current, { contain: true, startScale: 1.3 })
    panzoom.pan(10, 10, { relative: true })
    const parent = elem.current.parentElement
    parent.addEventListener('wheel', function (event) {
      if (!event.shiftKey) {
        return
      }
      panzoom.zoomWithWheel(event)
    })
  }, [])
  return (
    <Demo title="Containment within the parent" code={code}>
      <div className="buttons">
        <label>Try me: </label>
        <button
          onClick={() => {
            panzoom.zoomIn()
          }}
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            panzoom.zoomOut()
          }}
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            panzoom.reset()
          }}
        >
          Reset
        </button>
      </div>
      <div className="panzoom-parent">
        <div
          className="panzoom"
          ref={elem}
          style={{
            background: '#000',
            width: '400px',
            border: '2px dotted #ff0',
            margin: '0 auto'
          }}
        >
          <img style={{ width: '100%', height: '100%' }} src="awesome_tiger.svg" />
        </div>
      </div>
    </Demo>
  )
}
