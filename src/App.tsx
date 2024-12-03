import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Default,
  Alphabetically,
  Length,
}

export const App: React.FC = () => {
  const [sortMode, setSortMode] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const sorteredGoods: string[] = [...goodsFromServer].sort((a, b) => {
    const reverseMultiplicator = isReverse ? 1 : -1;

    if (sortMode === SortType.Alphabetically) {
      return reverseMultiplicator * a.localeCompare(b);
    } else if (sortMode === SortType.Length) {
      return reverseMultiplicator * (a.length - b.length);
    }

    return 0;
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!(sortMode === SortType.Alphabetically) && 'is-light'}`}
          onClick={() => {
            setSortMode(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!(sortMode === SortType.Length) && 'is-light'}`}
          onClick={() => {
            setSortMode(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>
        {(sortMode !== SortType.Default || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortMode(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sorteredGoods.map((good: string, index: number) => {
            return (
              <li key={index} data-cy="Good">
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
