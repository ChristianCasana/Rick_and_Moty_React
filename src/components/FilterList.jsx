import React from 'react'

const FilterList = ({ suggestedList, setChapter }) => {

  const handleClick = id => setChapter(id)

  return (
    <ul>
      {
        suggestedList?.map(list => (
          <li onClick={() => handleClick(list.id)} key={list.id}>
            {list.name}
          </li>
        ))
      }
    </ul>
  )
}

export default FilterList