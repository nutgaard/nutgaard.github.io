module Msg exposing (..)

type Msg =
    Inc
    | Dec
    | Reset
    | Roll
    | RollResult Int
    | Change String