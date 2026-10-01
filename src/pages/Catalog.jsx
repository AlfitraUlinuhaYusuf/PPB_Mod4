import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('name-asc')

  const filteredGuns = GUNS
    .filter((gun) => {
      const query = search.trim().toLowerCase()
      const matchesSearch = [gun.name, gun.type, gun.caliber]
        .some((value) => value.toLowerCase().includes(query))
      return matchesSearch && (type === 'All' || gun.type === type)
    })
    .sort((first, second) => {
      if (sort === 'name-asc') return first.name.localeCompare(second.name)
      if (sort === 'name-desc') return second.name.localeCompare(first.name)
      if (sort === 'price-asc') return first.price - second.price
      return second.price - first.price
    })

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} of {GUNS.length} pieces</span>
        </div>
        <div className="catalog-controls">
          <label className="catalog-search">
            <span>Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name, type, or caliber"
            />
          </label>
          <label>
            <span>Type</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="All">All types</option>
              <option value="Pistol">Pistol</option>
              <option value="Rifle">Rifle</option>
              <option value="Shotgun">Shotgun</option>
            </select>
          </label>
          <label>
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
        <ul className="stock">
          {filteredGuns.map((gun) => <GunCard key={gun.name} gun={gun} />)}
        </ul>
        {filteredGuns.length === 0 && <p className="empty-results">No matching items.</p>}
      </section>
    </>
  )
}

export default Catalog