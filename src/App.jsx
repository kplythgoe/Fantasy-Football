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
  const [playersSelected, setPlayersSelected] = useState(0);

  const [mainSearch, setMainSearch] = useState(["all players"]);
  const [choiceType, setChoiceType] = useState("position");

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
        <PlayerSelection
          data={data}
          amount={amount}
          mainSearch={mainSearch}
          setMainSearch={setMainSearch}
          choiceType={choiceType}
          setChoiceType={setChoiceType}
        />
        <PitchView
          playersSelected={playersSelected}
          amount={amount}
          mainSearch={mainSearch}
          setMainSearch={setMainSearch}
          choiceType={choiceType}
          setChoiceType={setChoiceType}
        />
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

function PlayerSelection({
  data,
  amount,
  mainSearch,
  setMainSearch,
  choiceType,
  setChoiceType,
}) {
  const [playerSearch, setPlayerSearch] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  // const [mainSearch, setMainSearch] = useState(["all players"]);
  // const [choiceType, setChoiceType] = useState("position");
  const [priceAmount, setPriceAmount] = useState(amount);
  const [sortBy, setSortBy] = useState("total_points");

  const selectedTeam = data?.teams?.find((team) => team.name === mainSearch[0]);

  const selectedTeamCode = selectedTeam?.code;

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
          playerSearch={playerSearch}
          amount={amount}
        />
      </div>
    </div>
  );
}

function PitchView({ playersSelected, amount, setMainSearch, setChoiceType }) {
  return (
    <div className="pitch-view-box">
      <div className="pitch-view-box-intro">
        <BoxTitle title="Squad Selection" />
        <p>
          Select a maximum of 3 players from a single team or 'Auto Pick' if you
          are short of time.
        </p>
      </div>
      <div className="squad-values">
        <div className="players-selected">
          <p className="notification">{playersSelected} / 15</p>
          <p>Players selected</p>
        </div>
        <div className="budget-remaining">
          <p className="notification">£{amount.toFixed(1)}</p>
          <p>Bank</p>
        </div>
      </div>
      <div className="the-pitch">
        <div className="pitch-sections">
          <div className="pitch-section-goalkeepers pitch-section">
            <PlayerPosition
              pos={"GKP"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Goalkeepers"}
              pos_id={1}
            />
            <PlayerPosition
              pos={"GKP"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Goalkeepers"}
              pos_id={1}
            />
          </div>
          <div className="pitch-section-defenders pitch-section">
            <PlayerPosition
              pos={"DEF"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Defenders"}
              pos_id={2}
            />
            <PlayerPosition
              pos={"DEF"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Defenders"}
              pos_id={2}
            />
            <PlayerPosition
              pos={"DEF"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Defenders"}
              pos_id={2}
            />
            <PlayerPosition
              pos={"DEF"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Defenders"}
              pos_id={2}
            />
            <PlayerPosition
              pos={"DEF"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Defenders"}
              pos_id={2}
            />
          </div>
          <div className="pitch-section-midfielders pitch-section">
            <PlayerPosition
              pos={"MID"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Midfielders"}
              pos_id={3}
            />
            <PlayerPosition
              pos={"MID"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Midfielders"}
              pos_id={3}
            />
            <PlayerPosition
              pos={"MID"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Midfielders"}
              pos_id={3}
            />
            <PlayerPosition
              pos={"MID"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Midfielders"}
              pos_id={3}
            />
            <PlayerPosition
              pos={"MID"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Midfielders"}
              pos_id={3}
            />
          </div>
          <div className="pitch-section-forwards pitch-section">
            <PlayerPosition
              pos={"FOR"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Forwards"}
              pos_id={4}
            />
            <PlayerPosition
              pos={"FOR"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Forwards"}
              pos_id={4}
            />
            <PlayerPosition
              pos={"FOR"}
              setMainSearch={setMainSearch}
              setChoiceType={setChoiceType}
              position={"Forwards"}
              pos_id={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerPosition({
  pos,
  setChoiceType,
  setMainSearch,
  position,
  pos_id,
}) {
  return (
    <div className="player-position">
      <button
        onClick={() => {
          setChoiceType("position");
          setMainSearch([position, pos_id]);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="12"
          fill="currentColor"
          viewBox="0 0 16 12"
          className="_14cx0wl0"
          role="img"
          title="Add player"
          aria-label="Add player"
        >
          <path d="M10.182 5.818a2.908 2.908 0 1 0 0-5.818 2.908 2.908 0 1 0 0 5.818ZM3.636 4.364V2.182H2.182v2.182H0v1.454h2.182V8h1.454V5.818h2.182V4.364H3.636Zm6.546 2.909c-1.942 0-5.818.974-5.818 2.909v1.454H16v-1.454c0-1.935-3.876-2.91-5.818-2.91Z"></path>
        </svg>
        <span>{pos}</span>
      </button>
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

function PlayerOutput({
  data,
  mainSearch,
  choiceType,
  priceAmount,
  sortBy,
  playerSearch,
  amount,
}) {
  const Component = componentMap[mainSearch[0]];
  const normaliseText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return choiceType === "position" ? (
    <Component
      data={data}
      amount={amount}
      priceAmount={priceAmount}
      sortBy={sortBy}
      mainSearch={mainSearch}
      playerSearch={playerSearch}
      normaliseText={normaliseText}
    />
  ) : (
    <TeamChoiceList
      data={data}
      mainSearch={mainSearch}
      priceAmount={priceAmount}
      sortBy={sortBy}
      playerSearch={playerSearch}
      normaliseText={normaliseText}
      amount={amount}
    />
  );
}

function AllPlayers({
  data,
  priceAmount,
  sortBy,
  playerSearch,
  amount,
  normaliseText,
}) {
  return (
    <div className="all-players-list">
      <GoalkeepersList
        data={data}
        priceAmount={priceAmount}
        sortBy={sortBy}
        playerSearch={playerSearch}
        normaliseText={normaliseText}
        amount={amount}
      />
      <DefendersList
        data={data}
        priceAmount={priceAmount}
        sortBy={sortBy}
        playerSearch={playerSearch}
        normaliseText={normaliseText}
        amount={amount}
      />
      <MidfieldersList
        data={data}
        priceAmount={priceAmount}
        sortBy={sortBy}
        playerSearch={playerSearch}
        normaliseText={normaliseText}
        amount={amount}
      />
      <ForwardsList
        data={data}
        priceAmount={priceAmount}
        sortBy={sortBy}
        playerSearch={playerSearch}
        normaliseText={normaliseText}
        amount={amount}
      />
    </div>
  );
}

function GoalkeepersList({
  data,
  teamCode,
  priceAmount,
  sortBy,
  playerSearch,
  normaliseText,
  amount,
}) {
  const sortedPlayers = data?.elements
    ?.filter((player) => {
      const search = normaliseText(playerSearch);
      const matchesSearch =
        !playerSearch ||
        normaliseText(player.first_name).includes(search) ||
        normaliseText(player.second_name).includes(search) ||
        normaliseText(player.web_name).includes(search);

      return (
        player.element_type === 1 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount) &&
        matchesSearch
      );
    })
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      {sortedPlayers?.length > 0 && (
        <PositionHeader position={"Goalkeepers"} sortBy={sortBy} />
      )}
      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"gk"}
            key={player.id}
            sortBy={sortBy}
            amount={amount}
          />
        ))}
      </div>
    </>
  );
}

function DefendersList({
  data,
  teamCode,
  priceAmount,
  sortBy,
  playerSearch,
  normaliseText,
  amount,
}) {
  const sortedPlayers = data?.elements
    ?.filter((player) => {
      const search = normaliseText(playerSearch);
      const matchesSearch =
        !playerSearch ||
        normaliseText(player.first_name).includes(search) ||
        normaliseText(player.second_name).includes(search) ||
        normaliseText(player.web_name).includes(search);

      return (
        player.element_type === 2 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount) &&
        matchesSearch
      );
    })
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      {sortedPlayers?.length > 0 && (
        <PositionHeader position={"Defenders"} sortBy={sortBy} />
      )}

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"def"}
            key={player.id}
            sortBy={sortBy}
            amount={amount}
          />
        ))}
      </div>
    </>
  );
}

function MidfieldersList({
  data,
  teamCode,
  priceAmount,
  sortBy,
  playerSearch,
  normaliseText,
  amount,
}) {
  const sortedPlayers = data?.elements
    ?.filter((player) => {
      const search = normaliseText(playerSearch);
      const matchesSearch =
        !playerSearch ||
        normaliseText(player.first_name).includes(search) ||
        normaliseText(player.second_name).includes(search) ||
        normaliseText(player.web_name).includes(search);

      return (
        player.element_type === 3 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount) &&
        matchesSearch
      );
    })
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      {sortedPlayers?.length > 0 && (
        <PositionHeader position={"Midfeilders"} sortBy={sortBy} />
      )}

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"mid"}
            key={player.id}
            sortBy={sortBy}
            amount={amount}
          />
        ))}
      </div>
    </>
  );
}

function ForwardsList({
  data,
  teamCode,
  priceAmount,
  sortBy,
  playerSearch,
  normaliseText,
  amount,
}) {
  const sortedPlayers = data?.elements
    ?.filter((player) => {
      const search = normaliseText(playerSearch);
      const matchesSearch =
        !playerSearch ||
        normaliseText(player.first_name).includes(search) ||
        normaliseText(player.second_name).includes(search) ||
        normaliseText(player.web_name).includes(search);

      return (
        player.element_type === 4 &&
        (!teamCode || player.team_code === teamCode) &&
        player.now_cost / 10 <= Number(priceAmount) &&
        matchesSearch
      );
    })
    ?.sort((a, b) => {
      if (!sortBy) return 0;

      return b[sortBy] - a[sortBy]; // descending order
    });

  return (
    <>
      {sortedPlayers?.length > 0 && (
        <PositionHeader position={"Forwards"} sortBy={sortBy} />
      )}

      <div className="goalkeeper-list">
        {sortedPlayers?.map((player) => (
          <SinglePlayer
            data={data}
            player={player}
            position={"for"}
            key={player.id}
            sortBy={sortBy}
            amount={amount}
          />
        ))}
      </div>
    </>
  );
}

function TeamChoiceList({
  data,
  mainSearch,
  priceAmount,
  sortBy,
  amount,
  playerSearch,
  normaliseText,
}) {
  const team = data?.teams.find((team) => team.name === mainSearch[0]);
  const teamCode = team?.code;
  return (
    <>
      <GoalkeepersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
        amount={amount}
        normaliseText={normaliseText}
        playerSearch={playerSearch}
      />
      <DefendersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
        amount={amount}
        normaliseText={normaliseText}
        playerSearch={playerSearch}
      />
      <MidfieldersList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
        amount={amount}
        normaliseText={normaliseText}
        playerSearch={playerSearch}
      />
      <ForwardsList
        data={data}
        teamCode={teamCode}
        priceAmount={priceAmount}
        sortBy={sortBy}
        amount={amount}
        normaliseText={normaliseText}
        playerSearch={playerSearch}
      />
    </>
  );
}

function SinglePlayer({ data, player, position, sortBy, amount }) {
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
        <div className="player-add">
          <button disabled={amount < player.now_cost / 10}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="no8cf40"
              aria-label="Add player"
            >
              <path
                d="M15.5 7.25V8.75H8.75V15.5H7.25V8.75H0.5V7.25H7.25V0.5H8.75V7.25H15.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
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
