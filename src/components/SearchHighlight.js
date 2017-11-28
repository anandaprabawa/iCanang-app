import React from 'react';
import {
  connectInfiniteHits,
  connectSearchBox,
  connectHighlight
} from 'react-instantsearch/connectors';
import { Text } from 'react-native';

export const SearchHighlight = connectHighlight(
  ({ highlight, attributeName, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attributeName,
      hit,
      highlightProperty: '_highlightResult'
    });
    const highlightedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted)
        return (
          <Text key={idx} style={{ backgroundColor: '#ffff99' }}>
            {part.value}
          </Text>
        );
      return part.value;
    });
    return <Text>{highlightedHit}</Text>;
  }
);
