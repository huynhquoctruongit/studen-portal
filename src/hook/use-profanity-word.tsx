"use client";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import useSWR from "swr";

let profanityWordsCache: any = null;

export const useProfanityWords = () => {
  const { data: profanityWords } = useSWR("/items/profanity_words");
  const words = (profanityWords?.data || [])
    .map((item: any) => item.swear_word?.toLowerCase().normalize("NFD"))
    .sort((a: string, b: string) => (a?.length > b?.length ? -1 : 1))
    .join("|");

  const convertProfanityWords = (text: string) => {
    const regex = new RegExp(words, "g");
    return text.normalize("NFD").replaceAll(regex, "***");
  };

  return { convertProfanityWords };
};
