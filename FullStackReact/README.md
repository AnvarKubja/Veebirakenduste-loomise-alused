# FullStackReact käivitamise märkmed

Projekt kasutab React frontendi, ASP.NET Core backendi ja SQL Server LocalDB andmebaasi.

## Mis tööle saamiseks oluline oli

Andmebaasi ühendus asub failis:

```text
FullStackReact.Server/appsettings.json
```

Projekt kasutab connection stringi:

```text
Server=(localdb)\MSSQLLocalDB;Database=FullStackReact;Trusted_Connection=true;MultipleActiveResultSets=true
```

See tähendab, et tabelit ei pea käsitsi SQL-is looma. Tabel luuakse Entity Framework migratsiooniga.

## Andmebaasi loomine

CMD-s tuleb minna serveri kausta:

```cmd
cd FullStackReact.Server
```

Seejärel käivitada migratsioon:

```cmd
dotnet ef database update
```

Kui `dotnet ef` käsku ei leita, tuleb EF tööriist installida:

```cmd
dotnet tool install --global dotnet-ef
```

## Kus SQL-is tabelit näha

SSMS-is või Visual Studio SQL Server Object Exploreris tuleb ühenduda serverisse:

```text
(localdb)\MSSQLLocalDB
```

Seejärel ava:

```text
Databases -> FullStackReact -> Tables -> dbo.Planets
```

Kontrollimiseks saab jooksutada:

```sql
SELECT * FROM dbo.Planets;
```

## Mida tabel sisaldab

Migratsioon loob tabeli `Planets`, kus on väljad:

```text
PlanetsId
Name
Description
Type
Mass
```

Frontend küsib andmeid aadressilt:

```text
/api/Planets
```

Kui tabel on tühi, siis veebileht avaneb, aga planeetide nimekirjas andmeid ei kuvata enne, kui lisad uue planeedi.
