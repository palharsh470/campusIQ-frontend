import React, { Suspense } from 'react'

function withSuspense(Component) {
    return (
        <Suspense fallback={<div>Loading...</div>}><Component/></Suspense>
    )
}

export default withSuspense