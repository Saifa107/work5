export interface Movie {
    Mid:        number;
    Mo_name:    string;
    Mo_year:    string;
    Mo_runtiem: string;
    Mo_plot:    string;
    creators:   any[];
    stars:    any[];
}
export interface creators {
    M_cid:  number;
    C_name: string;
    C_born: string;
    Mid:    number;
}
export interface stars {
    M_sid:  number;
    S_name: string;
    S_born: string;
    Mid:    number;
}