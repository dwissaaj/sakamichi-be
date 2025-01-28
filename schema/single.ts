
import { relations } from "drizzle-orm";
import { boolean, date, int, singlestoreTable, text, timestamp } from "drizzle-orm/singlestore-core";


export const singles = singlestoreTable('single', {
    id: int().primaryKey().autoincrement(),
    name: text().unique(),
    numberSingle: int(),
    releaseDate: date(),
    composer: text(),
    writer: text(),
    totalSales: int().default(0),
    isPublished: boolean(),
    publishedDate: timestamp().defaultNow(),
    updateAt : timestamp().onUpdateNow(),

})

export const covers = singlestoreTable('image', {
    id: int().primaryKey().autoincrement(),
    track: text(),
    mainTrack: text(),
    name: text(),
    url: text(),
    publishedDate: timestamp().defaultNow(),
    updateAt : timestamp().onUpdateNow(),
})
export const singleRelations = relations(singles, ({many}) => ({
    covers: many(covers),
    trivias: many(trivias),
    positions: many(positions)
}))

export const coverRelations = relations(covers, ({one}) => ({
    singles: one(singles, {
        fields: [covers.name],
        references: [singles.name]
    })
}))
export const trivias = singlestoreTable('trivia', {
    id: int().primaryKey().autoincrement(),
    publishedDate: timestamp().defaultNow(),
    updateAt : timestamp().onUpdateNow(),
    fact: text(),
    single: text(),

})

export const triviasRelation = relations(trivias, ({one}) => ({
    singles: one(singles, {
        fields: [trivias.single],
        references: [singles.name]
    })
}))


export const lyrics = singlestoreTable('lyrics', {
    id: int().primaryKey().autoincrement(),
    single: text(),
    publishedDate: timestamp().defaultNow(),
    updateAt : timestamp().onUpdateNow(),
    japanLyrics: text(),
    englishLyrics: text(),
})

export const lyricsRelation = relations(lyrics, ({one}) => ({
    singles: one(singles, {
        fields: [lyrics.single],
        references: [singles.name]
    })
}))

export const positions = singlestoreTable('positions', {
    id: int().primaryKey().autoincrement(),
    single: text(),
    publishedDate: timestamp().defaultNow(),
    updateAt : timestamp().onUpdateNow(),
    name: text(),
    placement: text(),
})

export const positonsRelation = relations(positions, ({one}) => ({
    singles: one(singles, {
        fields: [positions.single],
        references: [singles.name]
    })
}))