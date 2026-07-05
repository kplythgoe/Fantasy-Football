import { useEffect, useState } from "react";

import "./App.css";

const componentMap = {
  "all players": AllPlayers,
  Goalkeepers: GoalkeepersList,
  Defenders: DefendersList,
  Midfielders: MidfieldersList,
  Forwards: ForwardsList,
};

const statLabels = {
  total_points: "TP",
  goals_scored: "G",
  assists: "A",
  clean_sheets: "CS",
  yellow_cards: "YC",
  red_cards: "RC",
};

export default function App() {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(100);

  useEffect(function () {
    async function fetchPlayerData() {
      const response = await fetch("/api/bootstrap-static/");
      const data = await response.json();
      setData(data);
      console.log(data);
    }
    fetchPlayerData();
  }, []);

  return (
    <div>
      <Header />
      <div className="boxes">
        <PlayerSelection data={data} amount={amount} />
        <PitchView />
      </div>
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="header">
        <img src="../src/assets/images/premier-league-logo.svg"></img>
      </div>
      <div className="subheader">
        <div className="subheader-assets">
          <img src="../src/assets/images/fpl-logo.svg"></img>
          <img src="../src/assets/images/players-hero.png"></img>
        </div>
        <div className="nav-menu">
          <a className="active-menu-item" href="">
            Squad Selection
          </a>
          <a href="">Pick Team</a>
        </div>
      </div>
    </>
  );
}

function PlayerSelection({ data, amount }) {
  const [playerSearch, setPlayerSearch] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [mainSearch, setMainSearch] = useState(["all players"]);
  const [choiceType, setChoiceType] = useState("position");
  const [priceAmount, setPriceAmount] = useState(amount);
  const [sortBy, setSortBy] = useState("total_points");

  const selectedTeam = data?.teams?.find((team) => team.name === mainSearch[0]);

  const selectedTeamCode = selectedTeam?.code;

  if (choiceType === "team") {
    console.log(mainSearch[0]);
    console.log(selectedTeamCode);
  }

  function handleReset() {
    setMainSearch(["all players"]);
    setPriceAmount(100);
    setChoiceType("position");
    setSearchModal(false);
    setPlayerSearch("");
    setSortBy("total_points");
  }

  function positionChoice(position) {
    setMainSearch(position);
    setChoiceType("position");
    setSearchModal((prev) => !prev);
  }

  function teamChoice(team) {
    setMainSearch(team);
    setChoiceType("team");
    setSearchModal((prev) => !prev);
  }

  return (
    <div className="player-selection-box">
      <BoxTitle title="Player Selection" />
      <p>
        Select a maximum of 3 players from a single team or 'Auto Pick' if
        you're short of time.
      </p>
      <div className="player-search">
        <label>Find a player</label>
        <div className="player-search-input">
          <input
            id="name-search"
            placeholder="Search by name"
            value={playerSearch}
            onChange={(e) => setPlayerSearch(e.target.value)}
          />
          {playerSearch !== "" && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setPlayerSearch("")}
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="player-filters">
        <div className="player-filters-selections">
          <button
            className={`button-modal ${searchModal ? "active-modal" : ""}`}
            onClick={() => setSearchModal((prev) => !prev)}
          >
            {mainSearch[0]}{" "}
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 6.49999V5.09999L8 10.1L3 5.09999V6.49999L8 11.5L13 6.49999Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <select
            id="total-points"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="total_points">Total points</option>
            <option value="goals_scored">Goals scored</option>
            <option value="assists">Assists</option>
            <option value="clean_sheets">Clean sheets</option>
            <option value="yellow_cards">Yellow cards</option>
            <option value="red_cards">Red cards</option>
          </select>
          <select
            id="player-prices"
            value={priceAmount}
            onChange={(e) => setPriceAmount(e.target.value)}
          >
            <option value={amount}>Affordable</option>
            <option value="14.7">£14.7m</option>
            <option value="14.2">£14.2m</option>
            <option value="13.7">£13.7m</option>
            <option value="13.2">£13.2m</option>
            <option value="12.7">£12.7m</option>
            <option value="12.2">£12.2m</option>
            <option value="11.7">£11.7m</option>
            <option value="11.2">£11.2m</option>
            <option value="10.7">£10.7m</option>
            <option value="10.2">£10.2m</option>
            <option value="9.7">£9.7m</option>
            <option value="9.2">£9.2m</option>
            <option value="8.7">£8.7m</option>
            <option value="8.2">£8.2m</option>
            <option value="7.7">£7.7m</option>
            <option value="7.2">£7.2m</option>
            <option value="6.7">£6.7m</option>
            <option value="6.2">£6.2m</option>
            <option value="5.7">£5.7m</option>
            <option value="5.2">£5.2m</option>
            <option value="4.7">£4.7m</option>
            <option value="4.2">£4.2m</option>
            <option value="3.7">£3.7m</option>
          </select>
          <button className="reset-filters" onClick={handleReset}>
            Reset{" "}
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14.5 8C14.5 11.6 11.6 14.5 8 14.5C4.4 14.5 1.5 11.6 1.5 8H2.5C2.5 11.05 4.95 13.5 8 13.5C11.05 13.5 13.5 11.05 13.5 8C13.5 4.95 11.05 2.5 8 2.5C4.95 2.5 4.4 3.45 3.4 5H6.5L5.5 6H2V2.5L3 1.5V3.85C4.2 2.35 6.05 1.5 8 1.5C11.6 1.5 14.5 4.4 14.5 8Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        {searchModal && (
          <div className="player-selection-modal">
            <div className="global">
              <h4>Global</h4>
              <div className="selection-grid">
                <p
                  className="active-choice"
                  onClick={() => setMainSearch(["all players"])}
                >
                  All players
                </p>
                <p>Watchlist</p>
              </div>
            </div>
            <div className="positions">
              <h4>Positions</h4>
              <div className="selection-grid">
                <p onClick={() => positionChoice(["Goalkeepers", 1])}>
                  Goalkeepers
                </p>
                <p onClick={() => positionChoice(["Defenders", 2])}>
                  Defenders
                </p>
                <p onClick={() => positionChoice(["Midfielders", 3])}>
                  Midfielders
                </p>
                <p onClick={() => positionChoice(["Forwards", 4])}>Forwards</p>
              </div>
            </div>
            <div className="team">
              <h4>Team</h4>
              <div className="selection-grid">
                {data?.teams.map((team) => (
                  <div
                    className="single-team"
                    key={team.id}
                    onClick={() => teamChoice([team.name])}
                  >
                    <img
                      src={`https://resources.premierleague.com/premierleague25/badges/${team.code}.svg`}
                      alt={team.name}
                    />
                    <p>{team.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="player-list">
        <div className="player-counts">
          <p>
            {mainSearch[0] === "all players"
              ? data?.elements.length
              : choiceType === "position"
                ? data?.elements.filter(
                    (player) => player.element_type === mainSearch[1],
                  ).length
                : data?.elements.filter(
                    (player) => player.team_code === selectedTeamCode,
                  ).length}{" "}
            players shown
          </p>
        </div>
        <PlayerOutput
          data={data}
          mainSearch={mainSearch}
          choiceType={choiceType}
          priceAmount={priceAmount}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
}

function PitchView() {
  return (
    <div className="pitch-view-box">
      <BoxTitle title="Squad Selection" />
      <p>
        Select a maximum of 3 players from a single team or 'Auto Pick' if you
        are short of time.
      </p>
    </div>
  );
}

function BoxTitle({ title }) {
  return (
    <div className="box-title">
      <h2>{title}</h2>
    </div>
  );
}

function PlayerOutput({ data, mainSearch, choiceType, priceAmount, sortBy }) {
  const Component = componentMap[mainSearch[0]];

  return choiceType === "position" ? (
    <Component data={data} priceAmount={priceAmount} sortBy={sortBy} />
  ) : (
    <TeamChoiceList
      data={data}
      mainSearch={mainSearch}
      priceAmount={priceAmount}
      sortBy={sortBy}
    />
  );
}

function AllPlayers({ data, priceAmount, sortBy }) {
  return (
    <div className="all-players-list">
      <GoalkeepersList data={data} priceAmount={priceAmount} sortBy={sortBy} />
      <DefendersList data={data} priceAmount={priceAmount} sortBy={sortBy} />
      <MidfieldersList data={data} priceAmount={priceAmount} sortBy={sortBy} />
      <ForwardsList data={data} priceAmount={priceAmount} sortBy={sortBy} />
    </div>
  );
}

function GoalkeepersList({ data, teamCode, priceAmount, sortBy }) {
  const sortedPlayers = data?.elements
    ?.filter(
      (player) =>
        player.element_type === 1 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount),
    )
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      <PositionHeader position={"Goalkeepers"} sortBy={sortBy} />

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"gk"}
            key={player.id}
            sortBy={sortBy}
          />
        ))}
      </div>
    </>
  );
}

function DefendersList({ data, teamCode, priceAmount, sortBy }) {
  const sortedPlayers = data?.elements
    ?.filter(
      (player) =>
        player.element_type === 2 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount),
    )
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      <PositionHeader position={"Defenders"} sortBy={sortBy} />

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"def"}
            key={player.id}
            sortBy={sortBy}
          />
        ))}
      </div>
    </>
  );
}

function MidfieldersList({ data, teamCode, priceAmount, sortBy }) {
  const sortedPlayers = data?.elements
    ?.filter(
      (player) =>
        player.element_type === 3 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount),
    )
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      <PositionHeader position={"Midfielders"} sortBy={sortBy} />

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"mid"}
            key={player.id}
            sortBy={sortBy}
          />
        ))}
      </div>
    </>
  );
}

function ForwardsList({ data, teamCode, priceAmount, sortBy }) {
  const sortedPlayers = data?.elements
    ?.filter(
      (player) =>
        player.element_type === 4 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount),
    )
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      <PositionHeader position={"Forwards"} sortBy={sortBy} />

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"for"}
            key={player.id}
            sortBy={sortBy}
          />
        ))}
      </div>
    </>
  );
}

function TeamChoiceList({ data, mainSearch, priceAmount, sortBy }) {
  const team = data?.teams.find((team) => team.name === mainSearch[0]);
  const teamCode = team?.code;
  return (
    <>
      <GoalkeepersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
      />
      <DefendersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
      />
      <MidfieldersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
      />
      <ForwardsList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
      />
    </>
  );
}

function SinglePlayer({ data, player, position, sortBy }) {
  return (
    <div className="single-player">
      <div className="player-info">
        <div className="player-info-shirt">
          <img
            src={`../src/assets/${position === "gk" ? "gk_shirts" : "outfield_shirts"}/${player.team_code}.webp`}
          />
        </div>
        <div className="player-info-content">
          <p className="single-player-name">{player.web_name}</p>
          <p className="player-team-pos">
            {data.teams.map(
              (team) =>
                team.code === player.team_code && (
                  <span key={team.id}>{team.name}</span>
                ),
            )}

            {data.element_types.map(
              (type) =>
                type.id === player.element_type && (
                  <span key={type.id}>{type.plural_name_short}</span>
                ),
            )}
          </p>
        </div>
      </div>
      <div className="price-points">
        <div className="price-info">
          <p>{(player.now_cost / 10).toFixed(1)}</p>
        </div>
        <div className="points-info">
          <p>{player[sortBy]}</p>
        </div>
      </div>
    </div>
  );
}

function PositionHeader({ position, sortBy }) {
  return (
    <div className="position-headers">
      <p className="position-title">{position}</p>
      <p className="position-price">Price</p>
      <p className="position-tp">{statLabels[sortBy]}</p>
    </div>
  );
}
