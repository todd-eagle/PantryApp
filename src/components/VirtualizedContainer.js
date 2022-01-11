import React from 'react'
import {FlatList } from 'react-native'

const VirtualizedContainer = (props) => {
    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            ListHeaderComponent={() => (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        />
    )
}

export default VirtualizedContainer
