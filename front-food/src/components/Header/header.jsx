import "./header.css";

function HeaderPage() {
  return (
    <header className="header-wrapper">
      <div className="header-contents">
        <div className="header-text">
          <h1>Order Your Fav Food Dear <i>Foodie !</i></h1>
          <p>
            Love is temporary, but biryani is forever!!  Roses are red, pizza is round,
            love is sweet, but food is profound!!  You can’t buy happiness, but you
            can order momos—and that’s kind of the same thing!! True love is when
            someone shares their last bite of dessert.
          </p>
        </div>

        <div className="header-action">
          <button className="btn-primary">View Menu</button>
        </div>
      </div>
    </header>
  )
}

export default HeaderPage