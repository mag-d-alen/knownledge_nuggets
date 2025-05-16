import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getNuggets = async (_: Request, res: Response) => {
  const { data, error } = await supabase.from('nuggets').select('*');
  if (error) {
    throw new Error(error.message);
  }
  res.status(200).json(data);
};

export const getNuggetById = async (req:Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('nuggets')
    .select('*')
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  res.status(200).json(data);
};

export const createNugget = async (req: Request, res: Response) => {
  console.log(req.body);
  const { data, error } = await supabase.from('nuggets').insert(req.body);
  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  res.status(200).json(data);
};

export const updateNugget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('nuggets')
    .update(req.body)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  res.status(200).json(data);
};

export const deleteNugget = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('nuggets').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  res.status(200).json(data);
};
