import React, {useEffect, useState} from 'react';
import Test from '../components/Test';

function TestPage() {
    useEffect(() => {
        fetch('/api').then(response => {
          return response.json()
        }).then(data => console.log(data))
      }, [])

    return <Test />
}

export default TestPage;